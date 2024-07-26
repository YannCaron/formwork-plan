import CrossPiece, { CrossPieceType } from "./src/CrossPiece";
import FormElement from "./src/FormElement";
import FormElements from "./src/FormElements";
import PropBorder from "./src/PropBorder";
import PropInter from "./src/PropInter";

class Context {
    crossPieces: CrossPiece[]
    quantities: Map<CrossPiece, number>
    forms: FormElements

    scale: number
    goal: number
    tolerance: number

    calculationCount: number

    getQuantity(crossPiece:CrossPiece):number {
        return this.quantities.get(crossPiece) || -10
    }

    addToQuantity(crossPiece:CrossPiece, q: number) {
        const quantity = this.getQuantity(crossPiece)
        this.quantities.set(crossPiece, quantity + q)
    }

    constructor(forms: FormElements, quantities: Map<CrossPiece, number>, elements: CrossPiece[], scale: number, goal: number, tolerance: number) {
        this.forms = forms
        this.quantities = quantities
        this.crossPieces = elements.reverse()
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

    for (const crossPiece of ctx.crossPieces) {
        ctx.forms.add(crossPiece)
        ctx.forms.add(ctx.forms.simulateSize(new PropBorder()) >= ctx.goal - ctx.tolerance ?
            new PropBorder() :
            new PropInter()
        )

        if (ctx.getQuantity(crossPiece) >= ctx.scale) {
            ctx.addToQuantity(crossPiece, -ctx.scale)

            const res = calculateRec(ctx)
            if (res) return res

            ctx.addToQuantity(crossPiece, ctx.scale)
        }

        ctx.forms.remove().remove()
    }

    return false

}

const primaries = [
    new CrossPiece(CrossPieceType.Primary, 90),
    new CrossPiece(CrossPieceType.Primary, 110),
    new CrossPiece(CrossPieceType.Primary, 115),
    new CrossPiece(CrossPieceType.Primary, 150),
    new CrossPiece(CrossPieceType.Primary, 170),
    new CrossPiece(CrossPieceType.Primary, 180)
]

const secondaries = [
    new CrossPiece(CrossPieceType.Secondary, 110),
    new CrossPiece(CrossPieceType.Secondary, 115),
    new CrossPiece(CrossPieceType.Secondary, 150),
    new CrossPiece(CrossPieceType.Secondary, 170),
    new CrossPiece(CrossPieceType.Secondary, 180)
]

const getQuantities = (crossPieces: CrossPiece[]): Map<CrossPiece, number> => {
    const map = new Map<CrossPiece, number>()
    for (const crossPiece of crossPieces) {
        map.set(crossPiece, 100)
    }
    return map
}

function calculate(elements: CrossPiece[], quantities: Map<CrossPiece, number>, scale: number, goal: number, tolerance: number): Context {
    const forms = new FormElements().add(new PropBorder())
    const ctx = new Context(forms, quantities, elements, scale, goal, tolerance)

    const res = calculateRec(ctx)

    if (res) {
        console.log(ctx.toString())
    } else {
        console.log('NOT FOUND !', ctx.forms.toString())
    }

    return ctx

}

let count = 0
let start = performance.now()

let nbX = -1
let oldNbX = 0
let nbY = -1
let oldNbY = 0

while (oldNbX != nbX || oldNbY != nbY) {
    oldNbX = nbX
    oldNbY = nbY

    const ctxX = calculate(primaries, getQuantities(primaries), nbY, 750, 5)
    nbX = (ctxX.forms.count - 1) / 2
    console.log('number of traverses in X', nbX)

    const ctxY = calculate(secondaries, getQuantities(secondaries), nbX, 750, 5)
    nbY = (ctxY.forms.count - 1) / 2
    console.log('number of traverses in Y', nbY)

    count++
}

let timeSpent = performance.now() - start
console.log(`Algorithms executed; iteration: ${count}, time spent: ${Math.round(timeSpent)} milliseconds`);

/*
for (let g = 500; g <= 1500; g += randomInt(50)) {
    calculate(g, 5)
}
*/
