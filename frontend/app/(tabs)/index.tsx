import { Alert, Button, GestureResponderEvent, View, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { useState } from 'react';
import CrossPiece from '../components/CrossPiece';
import styles from './../styles';

export default function HomeScreen() {

  const [p90, setP90] = useState('100');
  const [p110, setP110] = useState('100');
  const [p115, setP115] = useState('100');
  const [p150, setP150] = useState('100');
  const [p170, setP170] = useState('100');
  const [p180, setP180] = useState('100');

  const [s110, setS110] = useState('100');
  const [s115, setS115] = useState('100');
  const [s150, setS150] = useState('100');
  const [s170, setS170] = useState('100');
  const [s180, setS180] = useState('100');

  const [result, setResult] = useState('no result yet!');
 
  function calculate_onPress(e: GestureResponderEvent) {
    setResult('calculation started')
  }

  return (
    <View style={styles.column}>

      <Collapsible title="Primaries:">
        <CrossPiece name='P-90' value={p90} onChangeValue={setP90} />
        <CrossPiece name='P-110' value={p110} onChangeValue={setP110} />
        <CrossPiece name='P-115' value={p115} onChangeValue={setP115} />
        <CrossPiece name='P-150' value={p150} onChangeValue={setP150} />
        <CrossPiece name='P-170' value={p170} onChangeValue={setP170} />
        <CrossPiece name='P-180' value={p180} onChangeValue={setP180} />
      </Collapsible>

      <Collapsible title="Secondaries:">
        <CrossPiece name='S-110' value={s110} onChangeValue={setS110} />
        <CrossPiece name='S-115' value={s115} onChangeValue={setS115} />
        <CrossPiece name='S-150' value={s150} onChangeValue={setS150} />
        <CrossPiece name='S-170' value={s170} onChangeValue={setS170} />
        <CrossPiece name='S-180' value={s180} onChangeValue={setS180} />
      </Collapsible>

      <Button title="Calculate" onPress={calculate_onPress}></Button>

      <Text>Result:</Text>
      <Text>{result}</Text>

    </View>
  );
}
