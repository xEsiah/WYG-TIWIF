export class Destination {
  _id?: string;
  country: string;
  imageUrl: string;
  budget: number;
  isVisited: boolean;
  cities: string[];

  constructor(obj: any = {}) {
    this._id = obj._id;
    this.country = obj.country || '';
    this.imageUrl = obj.imageUrl || '';
    this.budget = obj.budget || 0;
    this.isVisited = obj.isVisited || false;
    this.cities = Array.isArray(obj.cities) ? obj.cities : [];
  }
}
