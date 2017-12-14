import { Model } from './model.interface';

export class Developer implements Model {
    private _id: number;
    private _name: string;
    private _founded: number;
    private _games;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    public toObject() {
        return {
            id: this.id,
            name: this.name,
            founded: this.founded,
            games: this.games
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

    public get games() {
        return this._games;
    }

    public set games(g) {
        this._games = g;
    }
}