import FormElements from "./src/FormElements";
import Prop from "./src/Prop";
import PRIMARIES from "./src/Primary";

class Context {
    forms: FormElements
    goal: number
    tolerance: number
    calculationCount: number

    constructor(forms: FormElements, goal: number, tolerance: number) {
        this.forms = forms
        this.goal = goal
        this.tolerance = tolerance
        this.calculationCount = 0
    }

    toString() {
        return `approximate: ${this.goal}, found: ${this.forms.size}, with tolerance: ${this.tolerance}, number of calcucations: ${this.calculationCount}, found topology: ${this.forms.toString()}`
    }
}

function calculateRec(ctx: Context): boolean {
    ctx.calculationCount++

    if (ctx.forms.size > ctx.goal - ctx.tolerance && ctx.forms.size <= ctx.goal) return true
    else if (ctx.forms.size > ctx.goal) return false

    const primaries = Object.values(PRIMARIES).reverse()
    for (const primary of primaries) {
        ctx.forms.add(primary).add(new Prop())
        const res = calculateRec(ctx)
        if (res) return res
        ctx.forms.remove().remove()
    }

    return false

}

function calculate(goal: number, tolerance: number) {
    const forms = new FormElements().add(new Prop())
    const ctx = new Context(forms, goal, tolerance)

    const res = calculateRec(ctx)

    if (res) {
        console.log(ctx.toString())
    } else {
        console.log('NOT FOUND !', ctx.forms.toString())
    }
}
for (let g = 500; g <= 1500; g++) {
    calculate(g, 5)
}
