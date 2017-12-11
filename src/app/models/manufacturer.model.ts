//
// Domain class
//

export class Manufacturer {
    
      private _id: number;
      private _name: string;
      private _founded: number;
      private _weapons;
    
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
    