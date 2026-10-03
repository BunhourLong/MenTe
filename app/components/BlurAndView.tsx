import { BlurTint, BlurView, BlurViewProps } from 'expo-blur'
import React, { ReactNode } from 'react'
import { Platform, ViewProps } from 'react-native'

interface Props extends ViewProps, BlurViewProps {
  children?: ReactNode
  androidBackground?: string
  tint?: BlurTint
  blurType?: 'dark' | 'light' | 'xlight' | 'chromeMaterialLight' | 'chromeMaterialDark' | 'ultraThinMaterialDark' | 'ultraThinMaterialLight'
}

function BlurAndView({ androidBackground, blurType, tint, intensity, children, ...rest }: Props) {
  const android = Platform.OS === 'android'

  const getBlurType = (): BlurTint => {
    const type = tint || blurType
    switch (type) {
      case 'light':
      case 'chromeMaterialLight':
      case 'ultraThinMaterialLight':
        return 'light'
      case 'dark':
      case 'chromeMaterialDark':
      case 'ultraThinMaterialDark':
        return 'dark'
      default:
        return 'default'
    }
  }

  return (
    <BlurView
      {...rest}
      intensity={intensity}
      tint={getBlurType()}
      experimentalBlurMethod={android ? 'dimezisBlurView' : undefined}
    >
      {children}
    </BlurView>
  )
}

export default BlurAndView
