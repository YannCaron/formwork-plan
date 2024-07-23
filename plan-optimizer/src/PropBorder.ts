import FormElement from "./FormElement"

export default class PropBorder extends FormElement {

    static SIZE = 12.5

    get size() {
        return PropBorder.SIZE
    }

    toString(): string {
        return `I`
    }

}