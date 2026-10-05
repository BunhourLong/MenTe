import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import { Ionicons } from '@expo/vector-icons'
import type { SFSymbol } from 'sf-symbols-typescript'
import modules from 'modules'
import { fontGSans } from '@customs/customFont'
import HomeContainer from 'screens/Home/HomeContainer'
import SearchContainer from 'screens/Search/SearchContainer'
import ProfileContainer from 'screens/Profile/ProfileContainer'
import TabBar from './TabBar'

const LegacyTab = createBottomTabNavigator()
const NativeTab = createNativeBottomTabNavigator()

// sfSymbol: iOS 26 native tabs. ionicon: the custom TabBar (Android, iOS < 26).
function EmptyTab(): null {
  return null
}

const TAB_DATA: {
  name: string
  label: string
  component: React.ComponentType<any>
  sfSymbol: SFSymbol
  ionicon: { fill: keyof typeof Ionicons.glyphMap; outline: keyof typeof Ionicons.glyphMap }
  systemItem?: 'search'
  // Pressing the tab pushes this root stack screen instead of switching to the tab.
  stack?: string
}[] = [
  { name: 'HomeTab', label: 'Store', component: HomeContainer, sfSymbol: 'house.fill', ionicon: { fill: 'home', outline: 'home-outline' } },
  { name: 'ScanTab', label: 'Scan', component: EmptyTab, sfSymbol: 'qrcode.viewfinder', ionicon: { fill: 'qr-code', outline: 'qr-code-outline' }, stack: 'SCAN_PRODUCT' },
]

function APP_TAB(): React.JSX.Element {
  const isIOS26Plus = Platform.OS === 'ios' && parseInt(String(Platform.Version), 10) >= 26
  if (isIOS26Plus) return <IOS26NativeTabs />
  return <LegacyTabs />
}

function IOS26NativeTabs(): React.JSX.Element {
  return (
    <NativeTab.Navigator
      screenOptions={{
        lazy: true,
        headerShown: false,
        tabBarMinimizeBehavior: 'none',
        tabBarLabelStyle: fontGSans,
        tabBarActiveTintColor: modules.PRIMARY,
      }}
    >
      {TAB_DATA.map(tab => (
        <NativeTab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarSystemItem: tab.systemItem,
            // A system item brings its own icon; setting one would override it.
            tabBarIcon: tab.systemItem ? undefined : { type: 'sfSymbol', name: tab.sfSymbol },
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              if (!tab.stack) return
              const { routes, index } = navigation.getState()
              const current = routes[index].name
              // Native tabs can't cancel a press, and any tab switch refocuses the tabs and pops a pushed
              // screen. So once the press's own switch lands, switch back, then push.
              setTimeout(() => {
                navigation.navigate(current)
                navigation.navigate(tab.stack!)
              })
            },
          })}
        />
      ))}
    </NativeTab.Navigator>
  )
}

function LegacyTabs(): React.JSX.Element {
  return (
    <LegacyTab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      tabBar={props => <TabBar {...props} />}
    >
      {TAB_DATA.map(tab => (
        <LegacyTab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.label,
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? tab.ionicon.fill : tab.ionicon.outline} size={size} color={color} />,
          }}
          listeners={({ navigation }) => ({
            tabPress: e => {
              if (!tab.stack) return
              e.preventDefault()
              navigation.navigate(tab.stack)
            },
          })}
        />
      ))}
    </LegacyTab.Navigator>
  )
}

export default APP_TAB
