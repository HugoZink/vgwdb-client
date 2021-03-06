import { Model } from './model.interface';

export class Manufacturer implements Model {
    
  private _id: number;
  private _name: string;
  private _founded: number;
  private _weapons;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  //Return object with current values, for use in json.stringify() for example
  public toObject() {
    return {
      id: this.id,
      name: this.name,
      founded: this.founded,
      weapons: this.weapons
    };
  }

  public get id(): number {
      return this._id;
  }

  public set id(i: number) {
      this._id = i;
  }

  public get name(): string {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }

  public get founded(): number {
      return this._founded;
  }

  public set founded(f: number) {
      this._founded = f;
  }

  public get weapons() {
    return this._weapons;
  }

  public set weapons(w) {
    this._weapons = w;
  }
  }
    