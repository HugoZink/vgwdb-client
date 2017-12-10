//
// Domain class
//

export class Weapon {

  private _id: number;
  private _name: string;
  private _description: string;
  private _designed: string;
  private _manufacturer;
  private _games;

  constructor(values: Object = {}) {
    Object.assign(this, values);
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

  public get designed(): string {
    return this.designed;
  }

  public set designed(d: string) {
    this._designed = d;
  }

  public get manufacturer() {
    return this._manufacturer;
  }

  public set manufacturer(m) {
    this._manufacturer = m;
  }

  public get games() {
    return this._games;
  }

  public set games(g) {
    this._games = g;
  }
}
