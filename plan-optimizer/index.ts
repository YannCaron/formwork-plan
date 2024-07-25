import { randomInt } from "crypto";
import FormElements from "./src/FormElements";
import PropBorder from "./src/PropBorder";
import PropInter from "./src/PropInter";
import FormElement from "./src/FormElement";
import CrossPiece, { CrossPieceType } from "./src/CrossPiece";

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

const primaries = () => {
    return [
        new CrossPiece(CrossPieceType.Primary, 90, 10),
        new CrossPiece(CrossPieceType.Primary, 110, 10),
        new CrossPiece(CrossPieceType.Primary, 115, 10),
        new CrossPiece(CrossPieceType.Primary, 150, 10),
        new CrossPiece(CrossPieceType.Primary, 170, 10),
        new CrossPiece(CrossPieceType.Primary, 180, 10)
    ]
}

const secondaries = () => {
    return [
        new CrossPiece(CrossPieceType.Secondary, 110, 10),
        new CrossPiece(CrossPieceType.Secondary, 115, 10),
        new CrossPiece(CrossPieceType.Secondary, 150, 10),
        new CrossPiece(CrossPieceType.Secondary, 170, 10),
        new CrossPiece(CrossPieceType.Secondary, 180, 10)
    ]
}

function calculate(elements: CrossPiece[], scale: number, goal: number, tolerance: number): Context {
    const forms = new FormElements().add(new PropBorder())
    const ctx = new Context(forms, elements, scale, goal, tolerance)

    const res = calculateRec(ctx)

    if (res) {
        console.log(ctx.toString())
    } else {
        console.log('NOT FOUND !', ctx.forms.toString())
    }

    return ctx

}

let nbX = -1
let oldNbX = 0
let nbY = -1
let oldNbY = 0

while (oldNbX != nbX || oldNbY != nbY) {
    oldNbX = nbX
    oldNbY = nbY

    const ctxX = calculate(primaries(), nbY, 750, 5)
    nbX = (ctxX.forms.count - 1) / 2
    console.log('number of X', nbX)

    const ctxY = calculate(secondaries(), nbX, 750, 5)
    nbY = (ctxY.forms.count - 1) / 2
    console.log('number of Y', nbY)
}


/*
for (let g = 500; g <= 1500; g += randomInt(50)) {
    calculate(g, 5)
}
*/
