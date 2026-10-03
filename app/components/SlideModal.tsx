import React, { forwardRef, useImperativeHandle } from 'react'
import { Pressable, StyleProp, StyleSheet, ViewProps, ViewStyle } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { Portal } from 'react-native-portalize'
import modules from 'modules'
import _styles from '@styles'

export const ANIMATION_DURATION = 250

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type SlideModalRef = {
  open: (callback?: () => void) => void
  close: (callback?: () => void) => void
}

interface Props extends ViewProps {
  backDropColor?: string
  notCancelable?: boolean
  containerStyle?: StyleProp<ViewStyle>
  onBackdropPress?: () => void
}

// Always mounted and driven by shared values, so open/close never re-renders React.
const SlideModal = forwardRef<SlideModalRef, Props>(({ style, children, backDropColor, notCancelable, containerStyle, onBackdropPress }, ref) => {
  const progress = useSharedValue(0)
  const active = useSharedValue(false)

  const close = (callback?: () => void) => {
    progress.value = withTiming(0, { duration: ANIMATION_DURATION }, finished => {
      if (!finished) return
      active.value = false
      callback && scheduleOnRN(callback)
    })
  }

  useImperativeHandle(ref, () => ({
    open: callback => {
      active.value = true
      progress.value = withTiming(1, { duration: ANIMATION_DURATION })
      callback && scheduleOnRN(callback)
    },
    close,
  }))

  const containerAnimation = useAnimatedStyle(() => ({ display: active.value ? 'flex' : 'none' }))
  const backdropAnimation = useAnimatedStyle(() => ({ opacity: progress.value }))
  const modalAnimation = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: interpolate(progress.value, [0, 1], [100, 0], Extrapolation.CLAMP) }],
  }))

  const backDropPress = () => {
    if (notCancelable) return
    if (onBackdropPress) onBackdropPress()
    else close()
  }

  return (
    <Portal>
      <Animated.View pointerEvents="box-none" style={[StyleSheet.absoluteFill, containerStyle, containerAnimation]}>
        <AnimatedPressable
          style={[StyleSheet.absoluteFill, backdropAnimation, { backgroundColor: backDropColor || modules.PLACE_HOLDER }]}
          onPress={backDropPress}
        />
        <Animated.View style={[styles.modal, style, modalAnimation]}>{children}</Animated.View>
      </Animated.View>
    </Portal>
  )
})

export default SlideModal

const styles = StyleSheet.create({
  modal: {
    zIndex: 999,
    ..._styles.shadowSmall,
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS_24,
  },
})
