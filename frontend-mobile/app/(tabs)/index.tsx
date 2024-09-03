import { Alert, Button, GestureResponderEvent, View, Text, TextInput, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { useState } from 'react';
import LabeledInput from '../components/LabeledInput';
import globalStyles from './../styles';
import Optimizer from '@cyann/plan-optimizer';

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

  const [width, setWidth] = useState('1000');
  const [height, setHeight] = useState('1000');
  const [tolerance, setTolerance] = useState('5');

  const [result, setResult] = useState('no result yet!');

  function calculate_onPress(e: GestureResponderEvent) {
    setResult('calculation started')

    const primaries = {
      p90: [90, p90],
      p110: [110, p110],
      p115: [115, p115],
      p150: [150, p150],
      p170: [170, p170],
      p180: [180, p180]
    }

    const secondaries = {
      s110: [110, s110],
      s115: [115, s115],
      s150: [150, s150],
      s170: [170, s170],
      s180: [180, s180]
    }

    const res = Optimizer.calculate(
      Number.parseInt(width), Number.parseInt(height),
      Number.parseInt(tolerance), primaries, secondaries)
    console.log('res', res);
    setResult(`result:
  - ${res.xAxis?.toString()}
  - ${res.yAxis?.toString()}
`)
  }

  return (
    <View style={styles.column}>

      <View style={styles.column}>
        <Text>Primaries</Text>
        <View style={styles.row}>
          <LabeledInput before='090' inputMode='numeric' value={p90} onChangeValue={setP90} />
          <LabeledInput before='110' inputMode='numeric' value={p110} onChangeValue={setP110} />
          <LabeledInput before='115' inputMode='numeric' value={p115} onChangeValue={setP115} />
          <LabeledInput before='150' inputMode='numeric' value={p150} onChangeValue={setP150} />
          <LabeledInput before='170' inputMode='numeric' value={p170} onChangeValue={setP170} />
          <LabeledInput before='180' inputMode='numeric' value={p180} onChangeValue={setP180} />
        </View>

        <Text>Secondaries</Text>
        <View style={styles.row}>
          <LabeledInput before='110' inputMode='numeric' value={s110} onChangeValue={setS110} />
          <LabeledInput before='115' inputMode='numeric' value={s115} onChangeValue={setS115} />
          <LabeledInput before='150' inputMode='numeric' value={s150} onChangeValue={setS150} />
          <LabeledInput before='170' inputMode='numeric' value={s170} onChangeValue={setS170} />
          <LabeledInput before='180' inputMode='numeric' value={s180} onChangeValue={setS180} />
        </View>

      </View>

      <Text>Global</Text>
      <View style={styles.row}>
        <LabeledInput before='Width' after='cm' inputMode='numeric' value={width} onChangeValue={setWidth} />
        <LabeledInput before='Height' after='cm' inputMode='numeric' value={height} onChangeValue={setHeight} />
        <LabeledInput before='Tolerance' after='cm' inputMode='numeric' value={tolerance} onChangeValue={setTolerance} />
      </View>

      <Button title="Calculate" onPress={calculate_onPress}></Button>

      <Text>Result:</Text>
      <Text>{result}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  ...globalStyles
})
