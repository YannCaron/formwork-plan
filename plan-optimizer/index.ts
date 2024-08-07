import Optimizer from "./src/Optimizer";

const primaries = {
    p90: [90, 10],
    p110: [110, 10],
    p115: [115, 10],
    p150: [150, 10],
    p170: [170, 10],
    p180: [180, 10]
}

const secondaries = {
    s110: [110, 8],
    s115: [115, 8],
    s150: [150, 8],
    s170: [170, 8],
    s180: [180, 8]
}

Optimizer.calculate(115, 550, 5, primaries, secondaries)