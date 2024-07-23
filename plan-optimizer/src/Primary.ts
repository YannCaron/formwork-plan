import FormElement from "./FormElement";

class Primary extends FormElement {

    private readonly _size:number

    get size() {
        return this._size
    }

    constructor(size: number) {
        super()
        this._size = size
    }

    toString(): string {
        return `P-${this._size}`
    }

}

export default class PRIMARIES {
    static P90 = new Primary(90)
    static P110 = new Primary(110)
    static P115 = new Primary(115)
    static P150 = new Primary(150)
    static P170 = new Primary(170)
    static P180 = new Primary(180)
}
