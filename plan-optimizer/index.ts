import { randomInt } from "crypto";
import FormElements from "./src/FormElements";
import PropBorder from "./src/PropBorder";
import PropInter from "./src/PropInter";
import FormElement from "./src/FormElement";
import CrossPiece from "./src/CrossPiece";

class Context {
    elements: FormElement[]
    forms: FormElements

    goal: number
    tolerance: number
    calculationCount: number

    constructor(forms: FormElements, elements: FormElement[], goal: number, tolerance: number) {
        this.forms = forms
        this.elements = elements.reverse()
        this.goal = goal
        this.tolerance = tolerance
        this.calculationCount = 0
    }

    toString() {
        return `goal: ${this.goal}, found: ${this.forms.size}, difference: ${this.goal - this.forms.size}, tolerance: ${this.tolerance}, iteration: ${this.calculationCount}, topology: ${this.forms.toString()}`
    }
}

function calculateRec(ctx: Context): boolean {
    ctx.calculationCount++

    if (ctx.forms.size >= ctx.goal - ctx.tolerance && ctx.forms.size <= ctx.goal) return true
    else if (ctx.forms.size > ctx.goal) return false

    for (const element of ctx.elements) {
        ctx.forms.add(element)
        ctx.forms.add(ctx.forms.simulateSize(new PropBorder()) >= ctx.goal - ctx.tolerance ?
            new PropBorder() :
            new PropInter()
        )

        const res = calculateRec(ctx)
        if (res) return res
        ctx.forms.remove().remove()
    }

    return false

}

const primaries = [
    new CrossPiece(90, 1),
    new CrossPiece(110, 1),
    new CrossPiece(115, 1),
    new CrossPiece(150, 1),
    new CrossPiece(170, 1),
    new CrossPiece(180, 1)
]


const secondaries = [
    new CrossPiece(110, 1),
    new CrossPiece(115, 1),
    new CrossPiece(150, 1),
    new CrossPiece(170, 1),
    new CrossPiece(180, 1)
]

function calculate(goal: number, tolerance: number) {
    const forms = new FormElements().add(new PropBorder())
    const ctx = new Context(forms, primaries, goal, tolerance)

    const res = calculateRec(ctx)

    if (res) {
        console.log(ctx.toString())
    } else {
        console.log('NOT FOUND !', ctx.forms.toString())
    }
}

for (let g = 500; g <= 1500; g += randomInt(50)) {
    calculate(g, 5)
}
