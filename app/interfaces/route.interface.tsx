import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export interface NavigationV5Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<any, any>
}
