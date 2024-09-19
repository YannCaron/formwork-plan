import { CrossPiece, CrossPieceType } from "./../index"
import { CrossPieceAssets } from "./../index"
import { FormElements } from "./../index"
import { PropBorder } from "./../index"
import { PropInter } from "./../index"

class Context {
    elements: CrossPieceAssets[]
    forms: FormElements

    scale: number
    goal: number
    tolerance: number

    calculationCount: number

    get rest() {
        return this.goal - this.forms.size
    }

    constructor(forms: FormElements, elements: CrossPieceAssets[], scale: number, goal: number, tolerance: number) {
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

class Result {

    timespent: number
    numberOfIteration: number
    xAxis: Context | null
    yAxis: Context | null

    constructor(timespent: number, numberOfIteration: number, xAxis: Context | null, yAxis: Context | null) {
        this.timespent = timespent
        this.numberOfIteration = numberOfIteration
        this.xAxis = xAxis
        this.yAxis = yAxis
    }

}

export default class Optimizer {

    private static isInTolerance(size: number, goal: number, tolerance: number) {
        return size >= goal - tolerance && size <= goal
    }

    private static isOutside(size: number, goal: number) {
        return size > goal
    }

    private static calculateRec(ctx: Context): boolean {
        ctx.calculationCount++

        if (this.isInTolerance(ctx.forms.size, ctx.goal, ctx.tolerance)) return true
        else if (this.isOutside(ctx.forms.size, ctx.goal)) return false

        for (const element of ctx.elements) {
            ctx.forms.add(element.crossPiece)
            ctx.forms.add(ctx.forms.simulateSize(new PropBorder()) >= ctx.goal - ctx.tolerance ?
                new PropBorder() :
                new PropInter()
            )

            if (element.quantity >= ctx.scale) {
                element.quantity -= ctx.scale

                const res = this.calculateRec(ctx)
                if (res) return res

                element.quantity += ctx.scale
            }

            ctx.forms.remove().remove()
        }

        return false

    }

    private static calculateAxis(elements: CrossPieceAssets[], scale: number, goal: number, tolerance: number): [boolean, Context] {
        const forms = new FormElements().add(new PropBorder())
        const ctx = new Context(forms, elements, scale, goal, tolerance)

        const res = this.calculateRec(ctx)

        if (res) {
            console.log(ctx.toString())
        } else {
            console.log('NOT FOUND !', ctx.forms.toString())
        }

        return [res, ctx]

    }

    static calculate(width: number, height: number, accuracy: number,
        primaries: {
            [k: number]: number[]
        }, secondaries: {
            [k: number]: number[]
        }): Result {

        let count = 0
        let start = performance.now()

        let nbX = -1
        let oldNbX = 0
        let nbY = -1
        let oldNbY = 0

        let currentCtxX: Context | null = null
        let currentCtxY: Context | null = null

        while (oldNbX != nbX || oldNbY != nbY) {
            oldNbX = nbX
            oldNbY = nbY

            const primaryAssets =
                Object.entries(primaries).map(([_, [t, n]]) => new CrossPieceAssets(new CrossPiece(CrossPieceType.Primary, t), n))

            let [resX, ctxX] = this.calculateAxis(primaryAssets, nbY, width, accuracy)
            nbX = (ctxX.forms.count - 1) / 2
            currentCtxX = ctxX
            console.log('number of traverses in X', nbX)
            if (!resX) break

            const secondaryAssets =
                Object.entries(secondaries).map(([_, [t, n]]) => new CrossPieceAssets(new CrossPiece(CrossPieceType.Secondary, t), n))

            let [resY, ctxY] = this.calculateAxis(secondaryAssets, nbX, height, accuracy)
            currentCtxY = ctxY
            nbY = (ctxY.forms.count - 1) / 2
            console.log('number of traverses in Y', nbY)
            if (!resY) break

            count++
        }

        let timeSpent = performance.now() - start
        console.log(`Algorithms executed; iteration: ${count}, time spent: ${Math.round(timeSpent)} milliseconds`);

        return new Result(timeSpent, count, currentCtxX, currentCtxY)
    }

}