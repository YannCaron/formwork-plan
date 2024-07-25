import FormElement from "./FormElement";

export enum CrossPieceType {
    Primary = 'Primary',
    Secondary = 'Secondary'
}

export default class CrossPiece extends FormElement {

    private readonly _type: CrossPieceType
    private readonly _size: number
    private _quantity: number

    get size() {
        return this._size
    }

    get quantity() {
        return this._quantity
    }

    set quantity(value: number) {
        this._quantity = value
    }

    constructor(type: CrossPieceType, size: number, quantity: number) {
        super()
        this._type = type
        this._size = size
        this._quantity = quantity
    }

    toString(): string {
        return `P-${this._size}`
    }

}
