import React from 'react'
import { useCameraDevice, useCodeScanner, Camera } from 'react-native-vision-camera'
import { useAppState } from '@react-native-community/hooks'
import { useIsFocused } from '@react-navigation/native'
import { NavigationV5Props } from 'interfaces/route.interface'
import { PRODUCTS } from 'dummy'
import ScanProductScreen from './ScanProductScreen'

interface Props extends NavigationV5Props { }

const ScanProductContainer = (props: Props): React.JSX.Element => {
    const appState = useAppState()

    // Read synchronously, so an already granted camera mounts on the first render instead of after the permission round trip.
    const [hasPermission, setHasPermission] = React.useState(() => Camera.getCameraPermissionStatus() === 'granted')
    const [code, setCode] = React.useState<string>()
    // Blurred while a screen is pushed on top, so the camera stops behind it.
    const isActive = useIsFocused() && appState === 'active'

    const device = useCameraDevice('back')
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'ean-8', 'upc-a', 'upc-e', 'code-128'],
        onCodeScanned: codes => { if (codes[0]?.value) setCode(codes[0].value) },
    })
    const product = code ? PRODUCTS.find(p => p.barcode === code) : undefined

    React.useEffect(() => {
        if (hasPermission) return
        Camera.requestCameraPermission().then(status => setHasPermission(status === 'granted'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ScanProductScreen
            device={device}
            hasPermission={hasPermission}
            isActive={isActive}
            codeScanner={codeScanner}
            code={code}
            product={product}
            onVerify={() => props.navigation.navigate('VERIFY_PRODUCT', { product })}
            onGoBack={props.navigation.goBack}
        />
    )
}

export default ScanProductContainer
