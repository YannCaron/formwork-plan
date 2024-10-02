import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import './App.css'
import QuantityEditor from './components/QuantityEditor'
import Optimizer from '@cyann/plan-optimizer';
import Plan from './Plan';
import { Result } from '@cyann/plan-optimizer/dist/src/Optimizer';

function App() {
  const [p90, setP90] = useState(100)
  const [p110, setP110] = useState(100)
  const [p115, setP115] = useState(100)
  const [p150, setP150] = useState(100)
  const [p170, setP170] = useState(100)
  const [p180, setP180] = useState(100)

  const [s110, setS110] = useState(100)
  const [s115, setS115] = useState(100)
  const [s150, setS150] = useState(100)
  const [s170, setS170] = useState(100)
  const [s180, setS180] = useState(100)

  const [width, setWidth] = useState(1000)
  const [height, setHeight] = useState(1000)
  const [tolerance, setTolerance] = useState(5)

  const [result, setResult] = useState<Result>()
  const [resultTxt, setResultTxt] = useState('pas de résultat pour le moment!')

  function calculate_onClick() {
    setResultTxt('calculation started')

    const primaries = {
      p90: [90, p90],    // pink
      p110: [110, p110], // black
      p115: [115, p115], // dark blue
      p150: [150, p150], // green
      p170: [170, p170], // red and cyan
      p180: [180, p180]  // cyan
    }

    const secondaries = {
      s110: [110, s110],
      s115: [115, s115],
      s150: [150, s150],
      s170: [170, s170],
      s180: [180, s180]
    }

    const res = Optimizer.calculate(
      width, height,
      tolerance, primaries, secondaries)

    setResult(res)

    const result =
      `axe x : ${res.xAxis?.forms.toString()}
total x : ${res.xAxis?.forms.size}
reste x : ${res.xAxis?.rest}
axe y : ${res.yAxis?.forms.toString()}
total y : ${res.yAxis?.forms.size}
reste y : ${res.yAxis?.rest}`

    setResultTxt(result)
  }

  return (
    <>
      <h1>Plan d'étaiement</h1>
      <Accordion defaultIndex={[2, 3]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Primaires
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <QuantityEditor before='90' value={p90} onChanged={v => setP90(v)} />
            <QuantityEditor before='110' value={p110} onChanged={v => setP110(v)} />
            <QuantityEditor before='115' value={p115} onChanged={v => setP115(v)} />
            <QuantityEditor before='150' value={p150} onChanged={v => setP150(v)} />
            <QuantityEditor before='170' value={p170} onChanged={v => setP170(v)} />
            <QuantityEditor before='180' value={p180} onChanged={v => setP180(v)} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Secondaires
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <QuantityEditor before='110' value={s110} onChanged={v => setS110(v)} />
            <QuantityEditor before='115' value={s115} onChanged={v => setS115(v)} />
            <QuantityEditor before='150' value={s150} onChanged={v => setS150(v)} />
            <QuantityEditor before='170' value={s170} onChanged={v => setS170(v)} />
            <QuantityEditor before='180' value={s180} onChanged={v => setS180(v)} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Calcul
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <QuantityEditor before='Longueur' after='cm' min={0} max={10000} value={height} onChanged={v => setHeight(v)} />
            <QuantityEditor before='Largeur ' after='cm' min={0} max={10000} value={width} onChanged={v => setWidth(v)} />
            <QuantityEditor before='Tolérance ' after='cm' min={1} max={15} value={tolerance} onChanged={v => setTolerance(v)} />
            <Button onClick={calculate_onClick}>Calcul</Button>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Résultats
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text whiteSpace={'pre-line'} align={'left'}>{resultTxt}</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Plan
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Plan plan={result} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default App
