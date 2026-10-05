import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold, fontGSans } from '@customs/customFont'
import { Store } from 'dummy'
import { strings } from 'services/i18n.services'
import { formatDistance } from 'utils/map.utils'
import PressableScale from 'components/PressableScale'
import ProductThumb from 'components/ProductThumb'
import ImageCache from 'components/ImageCache'

interface Props {
    store: Store
    distance?: number
    onPress: () => void
}

const THUMBS = 4
const THUMB_SIZE = 40

function StoreCard({ store, distance, onPress }: Props): React.JSX.Element {
    const extra = store.products.length - THUMBS

    return (
        <PressableScale style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <ImageCache source={store.logo} style={styles.logo} contentFit="cover" recyclingKey={store.id} />
                <View style={_styles.flx1}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name} numberOfLines={1}>{store.name}</Text>
                        <Ionicons name="shield-checkmark" size={14} color={modules.SUCCESS} />
                    </View>
                    <Text style={styles.address} >{store.address}</Text>
                </View>
                {distance !== undefined && (
                    <View style={styles.distance}>
                        <Ionicons name="navigate" size={11} color={modules.PRIMARY} />
                        <Text style={styles.distanceText}>{formatDistance(distance)}</Text>
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                <View style={styles.thumbs}>
                    {store.products.slice(0, THUMBS).map((product, index) => (
                        <View key={product.id} style={[styles.thumb, index > 0 && styles.thumbOverlap]}>
                            <ProductThumb product={product} size={THUMB_SIZE} />
                        </View>
                    ))}
                    {extra > 0 && (
                        <View style={[styles.thumb, styles.thumbOverlap, styles.more]}>
                            <Text style={styles.moreText}>+{extra}</Text>
                        </View>
                    )}
                </View>
                {/* <Text style={styles.count}>{strings('productsCount', { count: store.products.length })}</Text> */}
                <Ionicons name="chevron-forward" size={18} color={modules.APPLE_CHEVRON} />
            </View>
        </PressableScale>
    )
}

export default StoreCard

const styles = StyleSheet.create({
    card: {
        ..._styles.shadowSmall,
        padding: modules.BODY_HORIZONTAL_12,
        marginHorizontal: modules.BODY_HORIZONTAL_18,
        borderRadius: modules.HOME_CARD_RADIUS,
        backgroundColor: modules.WHITE,
    },
    header: {
        ..._styles.rows,
        gap: modules.BODY_HORIZONTAL_12,
    },
    logo: {
        width: 48,
        height: 48,
        borderRadius: modules.CARD_RADIUS,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: modules.BORDER_COLOR,
    },
    nameRow: {
        ..._styles.rows,
        gap: modules.SPACE,
    },
    name: {
        ...FontGSansBold,
        flexShrink: 1,
        fontSize: modules.FONT_H6,
        color: modules.TEXT,
    },
    address: {
        ...fontGSans,
        fontSize: modules.FONT_P,
        color: modules.SUB_TEXT,
        marginTop: 2,
    },
    distance: {
        ..._styles.rows,
        gap: 3,
        paddingVertical: 4,
        paddingHorizontal: modules.GRID_SPACING,
        borderRadius: 100,
        backgroundColor: modules.PRIMARY_BG,
    },
    distanceText: {
        ...FontGSansBold,
        fontSize: modules.FONT_S,
        color: modules.PRIMARY,
    },
    footer: {
        ..._styles.rows,
        gap: modules.GRID_SPACING,
        marginTop: modules.BODY_HORIZONTAL_12,
        paddingTop: modules.BODY_HORIZONTAL_12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: modules.BORDER_COLOR,
    },
    thumbs: {
        flexDirection: 'row',
    },
    // White ring so overlapping thumbs read as a stack.
    thumb: {
        borderRadius: THUMB_SIZE / 4.5 + 2,
        borderWidth: 2,
        borderColor: modules.WHITE,
    },
    thumbOverlap: {
        marginLeft: -THUMB_SIZE / 4,
    },
    more: {
        width: THUMB_SIZE + 4,
        height: THUMB_SIZE + 4,
        backgroundColor: modules.SEARCH_BG,
        ..._styles.center,
    },
    moreText: {
        ...FontGSansBold,
        fontSize: modules.FONT_P,
        color: modules.DARK_TEXT,
    },
    count: {
        ...FontGSansSemiBold,
        flex: 1,
        textAlign: 'right',
        fontSize: modules.FONT_P,
        color: modules.DARK_TEXT,
    },
})
