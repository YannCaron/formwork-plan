
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles';
import { Text, View } from 'react-native';

interface Props {
    name: string,
    value?: string,
    onChangeValue?: (v: string) => void
}

export default function CrossPiece(props: Props) {

    const onChangeText = (text: string) => {
        if (props.onChangeValue && +text) {
            props.onChangeValue(text)
        }
    }

    return (
        <View style={styles.row}>
            <Text>{props.name} :</Text>
            <TextInput style={styles.input}
                inputMode='numeric'
                value={props.value}
                onChangeText={onChangeText} />
        </View>
    )
}
