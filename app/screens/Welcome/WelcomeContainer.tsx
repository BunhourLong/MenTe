import React from 'react'
import { NavigationV5Props } from 'interfaces/route.interface'
import WelcomeScreen from './WelcomeScreen'

interface Props extends NavigationV5Props { }

const WelcomeContainer = (props: Props): React.JSX.Element => {
    return <WelcomeScreen onGetStarted={() => props.navigation.replace('APP_TAB')} />
}

export default WelcomeContainer
