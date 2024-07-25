import { randomInt } from "crypto";
import FormElements from "./src/FormElements";
import PropBorder from "./src/PropBorder";
import PropInter from "./src/PropInter";
import FormElement from "./src/FormElement";
import CrossPiece from "./src/CrossPiece";

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

function isInTolerance(size: number, goal: number, tolerance: number) {
    return size >= goal - tolerance && size <= goal
}

function isOutside(size: number, goal: number) {
    return size > goal
}

function calculateRec(ctx: Context): boolean {
    ctx.calculationCount++

    if (isInTolerance(ctx.forms.size, ctx.goal, ctx.tolerance)) return true
    else if (isOutside(ctx.forms.size, ctx.goal)) return false

    for (const element of ctx.elements) {
        ctx.forms.add(element)
        ctx.forms.add(ctx.forms.simulateSize(new PropBorder()) >= ctx.goal - ctx.tolerance ?
            new PropBorder() :
            new PropInter()
        )

        console.log(element);

        if (element.quantity >= ctx.scale) {
            element.quantity -= ctx.scale

            const res = calculateRec(ctx)
            if (res) return res

            element.quantity += ctx.scale
        }

        ctx.forms.remove().remove()
    }

    return false

}

const primaries = [
    new CrossPiece(90, 5),
    new CrossPiece(110, 5),
    new CrossPiece(115, 5),
    new CrossPiece(150, 5),
    new CrossPiece(170, 5),
    new CrossPiece(180, 15)
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
    const ctx = new Context(forms, primaries, 5, goal, tolerance)

    const res = calculateRec(ctx)

    if (res) {
        console.log(ctx.toString())
    } else {
        console.log('NOT FOUND !', ctx.forms.toString())
    }

    console.log('number of CrossPiece', (ctx.forms.count-1)/2)

}

calculate(750, 5)

/*
for (let g = 500; g <= 1500; g += randomInt(50)) {
    calculate(g, 5)
}
*/
