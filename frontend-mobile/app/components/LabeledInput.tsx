
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../styles';
import { InputModeOptions, StyleSheet, Text, View } from 'react-native';

interface Props {
    before: string,
    value?: string,
    after?: string,
    inputMode?: InputModeOptions | undefined,
    onChangeValue?: (v: string) => void
}

export default function CrossPiece(props: Props) {

    const onChangeText = (text: string) => {
        if (props.onChangeValue && (text === '' || text === '0' || +text)) {
            props.onChangeValue(text || '0')
        }
    }

    return (
        <View style={styles.spacedRow}>
            <Text>{props.before}</Text>
            <TextInput style={styles.input}
                inputMode={props.inputMode}
                value={props.value}
                onChangeText={onChangeText} />
            <Text>{props.after}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ...globalStyles,
    spacedRow: {
        ...globalStyles.row,
        margin: 5
    }
})
