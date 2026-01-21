export interface User {
  _id: string;
  username: string;
  email: string;
  pfpUrl?: string;
  subscriptions: User[];
}
