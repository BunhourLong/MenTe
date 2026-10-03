import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold } from '@customs/customFont'
import { Product } from 'dummy'
import Price from 'components/Price'
import PressableScale from 'components/PressableScale'
import ImageCache from 'components/ImageCache'

interface Props {
    product: Product
    width: number
    onPress: () => void
}

function ProductCard({ product, width, onPress }: Props): React.JSX.Element {
    return (
        <PressableScale style={[styles.card, { width }]} onPress={onPress}>
            <ImageCache source={product.image} style={styles.image} contentFit="cover" recyclingKey={product.id} />
            <View style={styles.info}>
                <Text style={styles.brand} numberOfLines={1}>{product.brand}</Text>
                <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                <View style={styles.footer}>
                    <Price style={styles.price} price={product.price} />
                    <View style={_styles.rows}>
                        <Ionicons name="star" size={12} color={modules.STATISTIC_ORANGE} />
                        <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
                    </View>
                </View>
            </View>
        </PressableScale>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    card: {
        ..._styles.shadowSmall,
        padding: modules.GRID_SPACING,
        borderRadius: modules.HOME_CARD_RADIUS,
        backgroundColor: modules.WHITE,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: modules.HOME_CARD_RADIUS - modules.GRID_SPACING,
    },
    info: {
        paddingHorizontal: modules.SPACE,
        paddingTop: modules.GRID_SPACING,
        paddingBottom: modules.SPACE,
    },
    brand: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_S,
        color: modules.SUB_TEXT,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    name: {
        ...FontGSansBold,
        fontSize: modules.FONT_P,
        lineHeight: 18,
        minHeight: 36,
        color: modules.TEXT,
        marginTop: 2,
    },
    footer: {
        ..._styles.rows,
        justifyContent: 'space-between',
        marginTop: modules.GRID_SPACING,
    },
    price: {
        ...FontGSansBold,
        flexShrink: 1,
        marginRight: modules.SPACE,
        fontSize: modules.FONT_P,
        color: modules.PRIMARY,
    },
    rating: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_S,
        color: modules.DARK_TEXT,
        marginLeft: 2,
    },
})
