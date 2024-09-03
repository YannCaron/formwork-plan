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
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})

export default styles