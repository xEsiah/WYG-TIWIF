import { Response } from "express";
import Destination from "./destination.model";

export const createDestination = async (req: any, res: Response) => {
  try {
    const { country, budget, imageUrl, cities } = req.body;

    if (!country?.trim())
      return res.status(400).json({ message: "Le pays est requis." });
    if (!imageUrl)
      return res.status(400).json({ message: "Veuillez choisir une image." });

    const numBudget = Number(budget);
    if (isNaN(numBudget) || numBudget <= 0) {
      return res
        .status(400)
        .json({ message: "Le budget doit être un entier positif." });
    }

    const newDest = new Destination({
      country: country.trim(),
      budget: numBudget,
      imageUrl,
      cities:
        typeof cities === "string"
          ? cities
              .split(",")
              .map((c: string) => c.trim())
              .filter(Boolean)
          : cities,
      userId: req.auth.userId,
    });

    await newDest.save();
    res.status(201).json(newDest);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création." });
  }
};

export const getDestinations = async (req: any, res: Response) => {
  const data = await Destination.find({ userId: req.auth.userId });
  res.json(data);
};

export const getOneDestination = async (req: any, res: Response) => {
  try {
    const data = await Destination.findOne({
      _id: req.params.id,
      userId: req.auth.userId,
    });
    if (!data)
      return res.status(404).json({ message: "Destination introuvable" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

export const updateDestination = async (req: any, res: Response) => {
  try {
    const { country, budget, cities } = req.body;
    const updateData: any = { ...req.body };

    if (country !== undefined) {
      if (!country.trim())
        return res.status(400).json({ message: "Le pays ne peut être vide." });
      updateData.country = country.trim();
    }
    if (budget !== undefined) {
      const numBudget = Number(budget);
      if (isNaN(numBudget) || numBudget <= 0) {
        return res.status(400).json({
          message: "Le budget doit être un entier positif.",
        });
      }
      updateData.budget = numBudget;
    }
    if (cities !== undefined && typeof cities === "string") {
      updateData.cities = cities
        .split(",")
        .map((c: string) => c.trim())
        .filter(Boolean);
    }
    const updated = await Destination.findOneAndUpdate(
      { _id: req.params.id, userId: req.auth.userId },
      updateData,
      { new: true },
    );
    if (!updated) return res.status(404).json({ message: "Introuvable." });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur de mise à jour." });
  }
};

export const removeDestination = async (req: any, res: Response) => {
  const deleted = await Destination.findOneAndDelete({
    _id: req.params.id,
    userId: req.auth.userId,
  });
  if (!deleted)
    return res
      .status(404)
      .json({ message: "Destination non trouvée ou non autorisée" });
  res.status(204).send();
};

export const getLastDestination = async (req: any, res: Response) => {
  try {
    const last = await Destination.findOne({ userId: req.auth.userId }).sort({
      _id: -1,
    });
    res.json(last);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
