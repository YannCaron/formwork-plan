import Optimizer from "./src/Optimizer";
import FormElement from "./src/FormElement";
import FormElements from "./src/FormElements";
import CrossPiece from "./src/CrossPiece";
import {CrossPieceType} from "./src/CrossPiece"
import CrossPieceAssets from "./src/CrossPieceAssets"
import PropBorder from "./src/PropBorder"
import PropInter from "./src/PropInter"

/*
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
*/

export { FormElement, FormElements, CrossPiece, CrossPieceType, CrossPieceAssets, PropBorder, PropInter }
export default Optimizer