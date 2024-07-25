import CrossPiece from "./CrossPiece";
import FormElement from "./FormElement";

export default class FormElements extends FormElement {

    private readonly _elements: Array<FormElement>

    get size() {
        return this._elements.map(e => e.size).reduce((acc, e) => acc + e, 0)
    }

    get count(){
        return this._elements.length        
    }

    constructor() {
        super()
        this._elements = new Array<FormElement>()
    }

    simulateSize(...elements: Array<FormElement>) {
        return this.size + elements
            .map(e => e.size)
            .reduce((acc, e) => acc + e)

    }

    add(element: FormElement) {
        this._elements.push(element)
        return this
    }

    remove() {
        this._elements.pop()
        return this
    }

    toString(): string {
        return this._elements.map(e => e.toString()).join(', ')
    }

}