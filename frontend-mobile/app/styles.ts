import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    input: {
        height: 30,
        width: 50,
        marginStart: 10,
        marginEnd: 10,
        borderWidth: 1
    },
    button: {
        marginStart: 10,
        marginEnd: 10
    }
})

export default styles