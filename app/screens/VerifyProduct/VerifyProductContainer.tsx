import React from 'react'
import { NavigationV5Props } from 'interfaces/route.interface'
import { Product } from 'dummy'
import { getVerdict } from './verdict'
import VerifyProductScreen from './VerifyProductScreen'

interface Props extends NavigationV5Props { }

const VerifyProductContainer = (props: Props): React.JSX.Element => {
    const { product } = props.route.params as { product: Product }
    const [answers, setAnswers] = React.useState<(boolean | undefined)[]>([])

    const onAnswer = (index: number, value: boolean) => setAnswers(prev => {
        const next = [...prev]
        next[index] = value
        return next
    })

    return (
        <VerifyProductScreen
            product={product}
            answers={answers}
            verdict={getVerdict(answers, product.checks.length)}
            onAnswer={onAnswer}
            onReset={() => setAnswers([])}
            onGoBack={props.navigation.goBack}
        />
    )
}

export default VerifyProductContainer
