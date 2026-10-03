import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductDetailContainer from 'screens/ProductDetail/ProductDetailContainer'
import VerifyProductContainer from 'screens/VerifyProduct/VerifyProductContainer'
import WelcomeContainer from 'screens/Welcome/WelcomeContainer'
import ScanProductContainer from 'screens/ScanProduct/ScanProductContainer'
import APP_TAB from './AppTab'

const HomeStack = createNativeStackNavigator()

export default function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <HomeStack.Navigator
                screenOptions={{
                    headerShown: false,
                    animationDuration: 200,
                    orientation: 'portrait_up',
                }}>
                <HomeStack.Screen name="WELCOME" component={WelcomeContainer} />
                <HomeStack.Screen name="APP_TAB" component={APP_TAB} />
                <HomeStack.Screen name="SCAN_PRODUCT" component={ScanProductContainer} />
                <HomeStack.Screen name="PRODUCT_DETAIL" component={ProductDetailContainer} />
                <HomeStack.Screen name="VERIFY_PRODUCT" component={VerifyProductContainer} />
            </HomeStack.Navigator>
        </NavigationContainer>
    )
}
