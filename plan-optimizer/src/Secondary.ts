import FormElement from "./FormElement";

class Secondary extends FormElement {

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
    static P110 = new Secondary(110)
    static P115 = new Secondary(115)
    static P150 = new Secondary(150)
    static P170 = new Secondary(170)
    static P180 = new Secondary(180)
}
