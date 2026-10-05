import React from 'react'
import { LayoutRectangle, Linking, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Camera, CameraDevice, CodeScanner } from 'react-native-vision-camera'
import LinearGradient from 'react-native-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold, fontGSans } from '@customs/customFont'
import ButtonPrimary from 'components/ButtonPrimary'
import PressableScale from 'components/PressableScale'
import BlurAndView from 'components/BlurAndView'
import ProductThumb from 'components/ProductThumb'
import { Product } from 'dummy'

interface Props {
    device: CameraDevice | undefined
    hasPermission: boolean
    isActive: boolean
    codeScanner: CodeScanner
    code?: string
    product?: Product

    onVerify: () => void
    onGoBack: () => void
}

const ScanProductScreen = (props: Props): React.JSX.Element => {
    const [layout, setLayout] = React.useState<LayoutRectangle>({ x: 0, y: 0, width: 1, height: 1 })
    const hasCameraAccess = !!props.device && props.hasPermission
    const insets = useSafeAreaInsets()

    const size = layout.width * GUIDE_WIDTH_RATIO
    const guide = { x: (layout.width - size) / 2, y: (layout.height - size) / 2 + GUIDE_OFFSET, width: size, height: size }
    // A border as thick as the screen, wrapped around the guide, dims everything outside it; the
    // border's inner edge keeps the guide's rounded corners.
    const spread = Math.hypot(layout.width, layout.height)

    return (
        <View style={_styles.containerWhite}>
            <View style={styles.cameraArea} onLayout={e => setLayout(e.nativeEvent.layout)}>
                {hasCameraAccess ? (
                    <>
                        <Camera
                            style={styles.camera}
                            device={props.device!}
                            isActive={props.isActive}
                            codeScanner={props.codeScanner}
                            // The default, 'device', rotates the photo by the accelerometer, which goes stale while the phone is tilted down over a product.
                            outputOrientation="preview"
                        />
                        <LinearGradient
                            pointerEvents="none"
                            style={styles.topScrim}
                            colors={TOP_SCRIM}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        />
                        <View pointerEvents="none" style={[styles.mask, {
                            left: guide.x - spread,
                            top: guide.y - spread,
                            width: guide.width + spread * 2,
                            height: guide.height + spread * 2,
                            borderWidth: spread,
                            borderRadius: spread + GUIDE_RADIUS,
                        }]} />
                        <View pointerEvents="none" style={[styles.guideBorder, { left: guide.x, top: guide.y, width: guide.width, height: guide.height }]} />
                    </>
                ) : (
                    <View style={[styles.camPlaceholder, _styles.center]}>
                        <View style={styles.permissionBadge}>
                            <Ionicons style={styles.cameraIcon} name="camera" />
                        </View>
                        <View style={styles.permissionBadgeText}>
                            <Text style={styles.permissionTitle}>Camera access needed</Text>
                            <Text style={styles.permissionSubtitle}>Allow camera access in Settings to scan products.</Text>
                        </View>
                        <PressableScale haptic style={styles.openSettingsButton} onPress={() => Linking.openSettings()}>
                            <Text style={styles.openSettings}>Open Settings</Text>
                        </PressableScale>
                    </View>
                )}
            </View>

            <View style={[styles.sheet, { paddingBottom: insets.bottom + modules.BODY_HORIZONTAL_12 }]}>
                {props.product ? (
                    <View style={[styles.result, styles.productRow]}>
                        <ProductThumb product={props.product} size={64} />
                        <View style={_styles.flx1}>
                            <Text style={styles.brandText} numberOfLines={1}>{props.product.brand}</Text>
                            <Text style={styles.nameText} numberOfLines={2}>{props.product.name}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={[styles.result, _styles.center]}>
                        <Text style={styles.codeText} numberOfLines={2}>{props.code ? 'Product not found' : 'Point the camera at a barcode'}</Text>
                        <Text style={styles.hintText}>{props.code ? `${props.code} is not in MenTe's database, so it can't be verified` : 'Fit the product barcode inside the frame'}</Text>
                    </View>
                )}
                <ButtonPrimary
                    disabled={!props.product}
                    style={styles.verifyButton}
                    onPress={props.onVerify}
                >
                    <Ionicons name="shield-checkmark" size={20} color={modules.WHITE} />
                    <Text style={styles.verifyLabel}>Verify authenticity</Text>
                </ButtonPrimary>
            </View>

            <PressableScale style={[styles.backButton, { top: insets.top + modules.SPACE }]} onPress={props.onGoBack}>
                <BlurAndView tint="light" intensity={60} androidBackground={modules.BACKGROUND_WALL} style={StyleSheet.absoluteFill} />
                <Ionicons name="chevron-back" size={24} color={modules.TEXT} />
            </PressableScale>
        </View>
    )
}

export default ScanProductScreen

const TOP_SCRIM = [...modules.NEW_GRADIENT].reverse()
// The sheet overlaps the camera's bottom, so a centred guide sits high in what is visible.
const GUIDE_OFFSET = 35
const GUIDE_WIDTH_RATIO = 0.75
const GUIDE_RADIUS = 18

const styles = StyleSheet.create({
    cameraArea: {
        flex: 1,
        backgroundColor: 'black',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    mask: {
        position: 'absolute',
        // Clipping lets iOS draw this screen-wide border on the GPU; unclipped, RN rasterises it on the main thread.
        overflow: 'hidden',
        borderColor: modules.DARK_BLUE_LABEL,
    },
    guideBorder: {
        position: 'absolute',
        borderWidth: 3,
        borderRadius: GUIDE_RADIUS,
        borderColor: modules.WHITE,
    },
    topScrim: {
        top: 0,
        left: 0,
        right: 0,
        height: 130,
        position: 'absolute',
    },
    camPlaceholder: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 42 / 2,
    },
    permissionBadge: {
        width: 108,
        height: 108,
        borderRadius: 54,
        borderWidth: 1,
        ..._styles.center,
        borderColor: 'rgba(255,255,255,0.14)',
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    permissionBadgeText: {
        padding: modules.BODY_HORIZONTAL,
    },
    cameraIcon: {
        fontSize: 44,
        color: modules.WHITE,
    },
    permissionTitle: {
        ...FontGSansBold,
        fontSize: modules.FONT_H4,
        color: modules.WHITE,
        textAlign: 'center',
        marginHorizontal: modules.BODY_HORIZONTAL_18,
    },
    permissionSubtitle: {
        ...fontGSans,
        fontSize: modules.FONT_H6,
        color: modules.SUB_TITLE,
        textAlign: 'center',
        marginTop: modules.BODY_HORIZONTAL_12 - 2,
        marginHorizontal: modules.BODY_HORIZONTAL_18,
    },
    openSettingsButton: {
        height: 46,
        borderRadius: 100,
        borderWidth: 1.5,
        ..._styles.center,
        borderColor: 'rgba(255,255,255,0.35)',
        paddingHorizontal: modules.BODY_HORIZONTAL_18,
    },
    openSettings: {
        ...FontGSansBold,
        fontSize: modules.FONT_H6,
        color: modules.WHITE,
    },
    sheet: {
        flex: 0.5,
        marginTop: -24,
        zIndex: 2,
        backgroundColor: modules.WHITE,
        borderTopLeftRadius: modules.APPLE_CARD_RADIUS + 12,
        borderTopRightRadius: modules.APPLE_CARD_RADIUS + 12,
        ..._styles.shadowSmall,
        paddingHorizontal: modules.BODY_HORIZONTAL_18,
        justifyContent: 'space-between',
    },
    result: {
        flex: 1,
        marginVertical: modules.BODY_HORIZONTAL,
    },
    codeText: {
        ...FontGSansBold,
        fontSize: modules.FONT_H4,
        color: modules.TEXT,
        textAlign: 'center',
    },
    hintText: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_H6,
        color: modules.TEXT_NOTE,
        textAlign: 'center',
        lineHeight: modules.FONT_H6 * 1.5,
        marginTop: modules.BODY_HORIZONTAL_12 / 2,
    },
    productRow: {
        ..._styles.rows,
        gap: modules.BODY_HORIZONTAL_12,
    },
    brandText: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_P,
        color: modules.SUB_TEXT,
    },
    nameText: {
        ...FontGSansBold,
        fontSize: modules.FONT_H5,
        color: modules.TEXT,
        marginTop: 2,
    },
    verifyButton: {
        ..._styles.rows,
        justifyContent: 'center',
        gap: modules.GRID_SPACING,
        width: '100%',
        height: 50,
        borderRadius: 100,
    },
    backButton: {
        position: 'absolute',
        zIndex: 3,
        left: modules.BODY_HORIZONTAL,
        width: 42,
        height: 42,
        borderRadius: 1000,
        overflow: 'hidden',
        ..._styles.center,
    },
    verifyLabel: {
        ...FontGSansBold,
        fontSize: modules.FONT_H6,
        color: modules.WHITE,
    },
})
