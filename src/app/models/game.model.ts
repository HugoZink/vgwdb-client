//
// Domain class
//

export class Game {

  private _id: number;
  private _name: string;

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
}
