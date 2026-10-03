import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { initialWindowMetrics, SafeAreaView } from 'react-native-safe-area-context'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansSemiBold } from '@customs/customFont'
import BlurAndView from 'components/BlurAndView'

// Android (targetSdk 36) is edge-to-edge, so the bar must also cover the system nav bar inset.
// ponytail: startup inset only; switch to useSafeAreaInsets if nav mode changes at runtime matter.
export const APP_TAB_HEIGHT = Platform.OS === 'android' ? 60 + (initialWindowMetrics?.insets.bottom ?? 0) : 90

const ICON_SIZE = 22

function TabBar({ state, descriptors, navigation }: BottomTabBarProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <BlurAndView tint="light" intensity={80} androidBackground={modules.WHITE} style={StyleSheet.absoluteFill} />
      <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.innerContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const isFocused = state.index === index
          const color = isFocused ? modules.LINK : modules.TEXT_NOTE

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name)
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.btn}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              onPress={onPress}
            >
              <View style={_styles.center}>
                {options.tabBarIcon?.({ focused: isFocused, color, size: ICON_SIZE })}
                <Text style={[styles.text, { color }]}>{options.title ?? route.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </SafeAreaView>
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
  text: {
    ...FontGSansSemiBold,
    textAlign: 'center',
    fontSize: modules.SMALL,
    paddingTop: modules.BODY_HORIZONTAL_12 / 3,
  },
  container: {
    height: APP_TAB_HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: modules.BORDER_COLOR,
  },
  innerContainer: {
    ..._styles.rows,
    paddingTop: modules.BODY_HORIZONTAL_12 / 2,
  },
  btn: {
    flex: 1,
    paddingTop: modules.BODY_HORIZONTAL_12 / 2,
  },
})
