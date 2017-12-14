//
// Domain class
//

export class Game {

  private _id: number;
  private _name: string;
  private _released: number;
  private _description: string;
  private _imagePath: string;
  private _developer;
  private _weapons;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  //Return object with current values, for use in json.stringify() for example
  public toObject() {
    return {
      id: this.id,
      name: this.name,
      released: this.released,
      description: this.description,
      imagePath: this.imagePath,
      developer: this.developer,
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

  public get description(): string {
    return this._description;
  }

  public set description(d: string) {
    this._description = d;
  }

  public get imagePath(): string {
    return this._imagePath;
  }

  public set imagePath(i: string) {
    this._imagePath = i;
  }

  public get released(): number {
    return this._released;
  }

  public set released(y: number) {
    this._released = y;
  }

  public get developer() {
    return this._developer;
  }

  public set developer(d) {
    this._developer = d;
  }

  public get weapons() {
    return this._weapons;
  }

  public set weapons(w) {
    this._weapons = w;
  }
}
