import React from 'react'
import { NavigationV5Props } from 'interfaces/route.interface'
import { PRODUCTS } from 'dummy'
import { useHookLanguage } from 'services/i18n.services'
import HomeScreen from './HomeScreen'

interface Props extends NavigationV5Props { }

const HomeContainer = (props: Props): React.JSX.Element => {
    useHookLanguage()

    return (
        <HomeScreen
            products={PRODUCTS}
            onPressProduct={product => props.navigation.navigate('PRODUCT_DETAIL', { product })}
        />
    )
}

export default HomeContainer
