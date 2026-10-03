import React from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import modules from 'modules'

// App-wide screen background. Render it as the first child of a screen's root container.
function AppBackground(): React.JSX.Element {
    return (
        <LinearGradient
            pointerEvents="none"
            colors={modules.APP_GRADIENT}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
        />
    )
}

export default AppBackground
