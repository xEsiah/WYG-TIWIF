import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getSecretKey = () => process.env.JWT_SECRET || "CLE_DE_SECOURS";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const key = getSecretKey();
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }
    const existingUsername = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    }); // regex me sert ici à comparé le string peu importe uppercase ou lowercase
    if (existingUsername) {
      return res.status(400).json({ message: "Ce pseudo est déjà pris" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      pfpUrl: req.body.pfpUrl || "",
      subscriptions: [],
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, key, {
      expiresIn: "24h",
    });
    res.status(201).json({
      userId: user._id,
      username: user.username,
      token: token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de l'inscription",
      detail: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const key = getSecretKey();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé !" });
    }
    const valid = await bcrypt.compare(password, user.password as string);
    if (!valid) {
      return res.status(400).json({ message: "Mot de passe incorrect !" });
    }
    const token = jwt.sign({ userId: user._id }, key, {
      expiresIn: "24h",
    });
    res.status(200).json({
      userId: user._id,
      username: user.username,
      token: token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur serveur lors de la connexion",
      detail: error.message,
    });
  }
};

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.auth.userId)
      .populate("subscriptions", "username pfpUrl")
      .select("-password");

    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    const followerCount = await User.countDocuments({
      subscriptions: req.auth.userId,
    });

    res.json({
      ...user.toObject(),
      followerCount: followerCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addSubscription = async (req: any, res: Response) => {
  try {
    const { username } = req.body;
    const currentUserId = req.auth.userId;
    const userToFollow = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });

    if (!userToFollow)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    if (userToFollow._id.toString() === currentUserId) {
      return res
        .status(400)
        .json({ message: "Vous ne pouvez pas vous suivre vous-même" });
    }
    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { subscriptions: userToFollow._id },
    });

    res.status(200).json({ message: "Abonnement réussi" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const removeSubscription = async (req: any, res: Response) => {
  try {
    const targetId = req.params.id;
    const user = await User.findById(req.auth.userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    (user.subscriptions as any).pull(targetId);
    await user.save();

    res.status(200).json({ message: "Suivi supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateAvatar = async (req: any, res: Response) => {
  try {
    const { pfpUrl } = req.body;
    await User.findByIdAndUpdate(req.auth.userId, { pfpUrl });
    res.status(200).json({ message: "Avatar mis à jour" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
