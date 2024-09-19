import {
    Box,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text
} from "@chakra-ui/react"

interface Props {
    before?: string,
    value?: number,
    after?: string,
    min?: number,
    max?: number
    onChanged?: (v: number) => void
}

export default function QuantityEditor(props: Props) {
    return (
        <>
            <Flex align={'center'} padding={1}>
                {props.before ?
                    <Text align={'right'}>{props.before}&nbsp;</Text> :
                    <></>}
                <NumberInput
                    defaultValue={props.value}
                    min={props.min || 0}
                    max={props.max || 100}
                    onChange={(_, vn) => props.onChanged ? props.onChanged(vn) : null}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                {props.after ?
                    <Text align={"left"}>&nbsp;{props.after}</Text> :
                    <></>}
            </Flex>
        </>
    )
}
