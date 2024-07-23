import FormElement from "./FormElement"

export default class PropInter extends FormElement {

    static SIZE = 10

    get size() {
        return PropInter.SIZE
    }

    toString(): string {
        return `i`
    }

}