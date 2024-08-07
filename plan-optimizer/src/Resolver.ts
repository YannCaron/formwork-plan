import CrossPiece from "./CrossPiece"
import FormElements from "./FormElements"

class Context {
    elements: CrossPiece[]
    forms: FormElements

    scale: number
    goal: number
    tolerance: number

    calculationCount: number

    constructor(forms: FormElements, elements: CrossPiece[], scale: number, goal: number, tolerance: number) {
        this.forms = forms
        this.elements = elements.reverse()
        this.scale = scale
        this.goal = goal
        this.tolerance = tolerance
        this.calculationCount = 0
    }

    toString() {
        return `goal: ${this.goal}, found: ${this.forms.size}, difference: ${this.goal - this.forms.size}, tolerance: ${this.tolerance}, iteration: ${this.calculationCount}, topology: ${this.forms.toString()}`
    }
}

export default class Resolver {



}