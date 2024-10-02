import { CrossPiece, FormElement, PropBorder, PropInter } from '@cyann/plan-optimizer'
import { Result } from '@cyann/plan-optimizer/dist/src/Optimizer'
import { useEffect, useRef } from 'react'

type Props = { plan?: Result }

function getColor(element: FormElement): string {
    if (element instanceof PropBorder) return '#333333'
    if (element instanceof PropInter) return '#444444'
    if (element.size === 180) return '#59d1e2' // cyan
    if (element.size === 170) return '#e27159' // red
    if (element.size === 150) return '#59e278' // green
    if (element.size === 115) return '#5976e2' // dask blue
    if (element.size === 110) return '#4f4f4f' // black
    if (element.size === 90) return '#e259cc' // pink
    return '#ff0000'
}

const Plan = (props: Props) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        console.log('plan', props.plan);

        if (!props.plan) {
            canvas.width = 0
            canvas.height = 0

            return
        }

        const width = window.innerWidth - 44
        const ratio = width / (props.plan.xAxis?.forms.size || 1)
        const height = (props.plan.yAxis?.forms.size || 1) * ratio

        canvas.width = width
        canvas.height = height
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, width, height)

        const primaries = props.plan.xAxis?.forms.elements
        const secondaries = props.plan.yAxis?.forms.elements

        if (!primaries || !secondaries) return

        {
            let y = 0
            for (const secondary of secondaries) {
                let x = 0

                if (!(secondary instanceof CrossPiece)) {
                    for (const primary of primaries) {
                        const w = primary.size * ratio
                        const h = secondary.size * ratio
                        context.fillStyle = getColor(primary)
                        context.fillRect(x, y, w, h)
                        x += w
                    }
                }

                y += secondary.size * ratio
            }
        }

        {
            let x = 0
            for (const primary of primaries) {
                let y = 0

                if (!(primary instanceof CrossPiece)) {
                    for (const secondary of secondaries) {
                        const h = secondary.size * ratio
                        const w = primary.size * ratio
                        context.fillStyle = getColor(secondary)
                        context.fillRect(x, y, w, h)
                        y += h
                    }
                }

                x += primary.size * ratio
            }
        }

        console.log('element', primaries);

    }, [props.plan])

    return <canvas ref={canvasRef} {...props} />
}

export default Plan