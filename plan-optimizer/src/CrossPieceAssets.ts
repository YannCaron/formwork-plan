import { CrossPiece } from "./../index";

export default class CrossPieceAssets {

    private readonly _crossPiece: CrossPiece
    private _quantity: number

    get crossPiece(): CrossPiece {
        return this._crossPiece
    }

    get quantity() {
        return this._quantity
    }

    set quantity(value: number) {
        this._quantity = value
    }

    constructor(crossPiece: CrossPiece, quantity: number) {
        this._crossPiece = crossPiece
        this._quantity = quantity
    }

}