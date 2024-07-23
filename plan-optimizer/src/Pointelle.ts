import FormElement from "./FormElement"

export default class Pointelle extends FormElement {

    static SIZE = 12

    get size() {
        return Pointelle.SIZE
    }

    toString(): string {
        return `I`
    }

}