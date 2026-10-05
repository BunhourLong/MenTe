import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import MapView, { Marker } from 'react-native-maps'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold, fontGSans } from '@customs/customFont'
import { Product, Store } from 'dummy'
import { strings } from 'services/i18n.services'
import { formatDistance } from 'utils/map.utils'
import BlurAndView from 'components/BlurAndView'
import PressableScale from 'components/PressableScale'
import ProductThumb from 'components/ProductThumb'
import ImageViewer from 'components/ImageViewer'
import ButtonPrimary from 'components/ButtonPrimary'
import AppBackground from 'components/AppBackground'

interface Props {
    store: Store
    distance?: number

    onOpenMap: () => void
    onPressProduct: (product: Product) => void
    onVerifyProduct: (product: Product) => void
    onGoBack: () => void
}

function StoreDetailScreen(props: Props): React.JSX.Element {
    const { store } = props
    const safeTop = useSafeAreaInsets().top

    return (
        <View style={_styles.containerWhite}>
            <AppBackground />
            <ScrollView contentContainerStyle={[styles.content, { paddingTop: safeTop + 42 + modules.BODY_HORIZONTAL_24 }]}>
                <View style={styles.hero}>
                    <ImageViewer source={store.logo} style={styles.logo} contentFit="cover" />
                </View>

                <View style={styles.badge}>
                    <Ionicons name="shield-checkmark" size={14} color={modules.SUCCESS} />
                    <Text style={styles.badgeText}>{strings('trustedStore')}</Text>
                </View>
                <Text style={styles.name}>{store.name}</Text>

                <InfoRow icon="location-outline" text={store.address} />
                <InfoRow icon="time-outline" text={store.openHours} />
                {props.distance !== undefined && <InfoRow icon="navigate-outline" text={formatDistance(props.distance)} />}

                {/* A still preview: tapping it opens Google Maps, like the button. */}
                <View style={styles.map}>
                    <MapView
                        style={StyleSheet.absoluteFill}
                        initialRegion={{ ...store.location, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        rotateEnabled={false}
                        pitchEnabled={false}
                        toolbarEnabled={false}
                        liteMode
                        onPress={props.onOpenMap}
                    >
                        <Marker coordinate={store.location} pinColor={modules.PRIMARY} />
                    </MapView>
                </View>

                <ButtonPrimary style={styles.directionsBtn} onPress={props.onOpenMap}>
                    <Ionicons name="navigate" size={20} color={modules.WHITE} />
                    <Text style={styles.directionsText}>{strings('getDirections')}</Text>
                </ButtonPrimary>

                <View style={styles.line} />

                <Text style={styles.sectionTitle}>{strings('authenticHere')}</Text>
                {store.products.map(product => (
                    <PressableScale key={product.id} style={styles.product} onPress={() => props.onPressProduct(product)}>
                        <ProductThumb product={product} size={56} />
                        <View style={_styles.flx1}>
                            <Text style={styles.productBrand} numberOfLines={1}>{product.brand}</Text>
                            <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                        </View>
                        <PressableScale haptic style={styles.verify} onPress={() => props.onVerifyProduct(product)}>
                            <Ionicons name="shield-checkmark" size={14} color={modules.PRIMARY} />
                            <Text style={styles.verifyText}>{strings('verify')}</Text>
                        </PressableScale>
                    </PressableScale>
                ))}
            </ScrollView>

            <PressableScale style={[styles.backButton, { top: safeTop + modules.SPACE }]} onPress={props.onGoBack}>
                <BlurAndView tint="light" intensity={60} androidBackground={modules.BACKGROUND_WALL} style={StyleSheet.absoluteFill} />
                <Ionicons name="chevron-back" size={24} color={modules.TEXT} />
            </PressableScale>
        </View>
    )
}

function InfoRow(props: { icon: React.ComponentProps<typeof Ionicons>['name']; text: string }): React.JSX.Element {
    return (
        <View style={styles.info}>
            <Ionicons name={props.icon} size={18} color={modules.SUB_TEXT} />
            <Text style={styles.infoText}>{props.text}</Text>
        </View>
    )
}

export default StoreDetailScreen

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: modules.BODY_HORIZONTAL_18,
        paddingBottom: modules.BODY_HORIZONTAL_ACTION,
    },
    hero: {
        alignItems: 'center',
        marginBottom: modules.BODY_HORIZONTAL_24,
    },
    logo: {
        width: 160,
        height: 160,
        borderRadius: 160 / 4.5,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: modules.BORDER_COLOR,
    },
    map: {
        height: 200,
        borderRadius: modules.HOME_CARD_RADIUS,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: modules.BORDER_COLOR,
        marginTop: modules.BODY_HORIZONTAL_24,
    },
    badge: {
        ..._styles.rows,
        alignSelf: 'flex-start',
        gap: 4,
        paddingVertical: 4,
        paddingHorizontal: modules.GRID_SPACING,
        borderRadius: 100,
        backgroundColor: modules.SUCCESS_BG,
    },
    badgeText: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_S,
        color: modules.SUCCESS,
    },
    name: {
        ...FontGSansBold,
        fontSize: modules.FONT_H3,
        color: modules.TEXT,
        marginTop: modules.GRID_SPACING,
        marginBottom: modules.SPACE,
    },
    info: {
        ..._styles.rows,
        gap: modules.GRID_SPACING,
        marginTop: modules.SPACE,
    },
    infoText: {
        ...fontGSans,
        flex: 1,
        fontSize: modules.FONT_H7,
        color: modules.DARK_TEXT,
    },
    directionsBtn: {
        ..._styles.rows,
        justifyContent: 'center',
        gap: modules.GRID_SPACING,
        width: '100%',
        height: 52,
        borderRadius: modules.CARD_RADIUS,
        marginTop: modules.BODY_HORIZONTAL_12,
    },
    directionsText: {
        ...FontGSansBold,
        fontSize: modules.FONT_H6,
        color: modules.WHITE,
    },
    line: {
        marginVertical: modules.BODY_HORIZONTAL_24,
        height: StyleSheet.hairlineWidth,
        backgroundColor: modules.BORDER_COLOR,
    },
    sectionTitle: {
        ...FontGSansBold,
        fontSize: modules.FONT_H5,
        color: modules.TEXT,
        marginBottom: modules.SPACE,
    },
    product: {
        ..._styles.rows,
        gap: modules.BODY_HORIZONTAL_12,
        paddingVertical: modules.BODY_HORIZONTAL_12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: modules.BORDER_COLOR,
    },
    productBrand: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_P,
        color: modules.SUB_TEXT,
    },
    productName: {
        ...FontGSansBold,
        fontSize: modules.FONT_H6,
        color: modules.TEXT,
        marginTop: 2,
    },
    verify: {
        ..._styles.rows,
        gap: 4,
        height: 34,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
        borderRadius: 100,
        backgroundColor: modules.PRIMARY_BG,
    },
    verifyText: {
        ...FontGSansBold,
        fontSize: modules.FONT_P,
        color: modules.PRIMARY,
    },
    backButton: {
        position: 'absolute',
        left: modules.BODY_HORIZONTAL,
        width: 42,
        height: 42,
        borderRadius: 1000,
        overflow: 'hidden',
        ..._styles.center,
    },
})
