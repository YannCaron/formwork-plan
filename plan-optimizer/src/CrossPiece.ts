import FormElement from "./FormElement";

export enum CrossPieceType {
    Primary = 'Primary',
    Secondary = 'Secondary'
}

export default class CrossPiece extends FormElement {

    private readonly _type: CrossPieceType
    private readonly _size: number

    get size() {
        return this._size
    }

    constructor(type: CrossPieceType, size: number) {
        super()
        this._type = type
        this._size = size
    }

    toString(): string {
        return `${this._type.substring(0, 1)}-${this._size}`
    }

}
