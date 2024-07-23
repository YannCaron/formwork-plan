import FormElement from "./FormElement"

export default class Prop extends FormElement {

    static SIZE = 12

    get size() {
        return Prop.SIZE
    }

    toString(): string {
        return `I`
    }

}