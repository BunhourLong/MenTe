import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold, fontGSans } from '@customs/customFont'
import { Product } from 'dummy'
import { formatKRW } from 'services/format.service'
import BlurAndView from 'components/BlurAndView'
import PressableScale from 'components/PressableScale'
import ProductThumb from 'components/ProductThumb'
import ButtonPrimary from 'components/ButtonPrimary'

interface Props {
    product: Product

    onVerify: () => void
    onGoBack: () => void
}

function ProductDetailScreen(props: Props): React.JSX.Element {
    const { product } = props
    const safeTop = useSafeAreaInsets().top

    return (
        <View style={_styles.containerWhite}>
            <ScrollView contentContainerStyle={[styles.content, { paddingTop: safeTop + 42 + modules.BODY_HORIZONTAL_24 }]}>
                <View style={styles.hero}>
                    <ProductThumb product={product} size={160} />
                </View>

                <Text style={styles.brand}>{product.brand}</Text>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.nameKo}>{product.nameKo}</Text>

                <View style={styles.metaRow}>
                    <Text style={styles.price}>{formatKRW(product.price)}</Text>
                    <View style={_styles.rows}>
                        <Ionicons name="star" size={16} color={modules.STATISTIC_ORANGE} />
                        <Text style={styles.meta}>{product.rating.toFixed(1)}</Text>
                    </View>
                </View>

                <View style={styles.chips}>
                    {[product.category, product.volume, product.barcode].map(value => (
                        <View key={value} style={styles.chip}>
                            <Text style={styles.chipText}>{value}</Text>
                        </View>
                    ))}
                </View>

                <ButtonPrimary style={styles.verifyBtn} onPress={props.onVerify}>
                    <Ionicons name="shield-checkmark" size={20} color={modules.WHITE} />
                    <Text style={styles.verifyText}>Verify authenticity</Text>
                </ButtonPrimary>

                <View style={styles.line} />

                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.body}>{product.description}</Text>

                <Text style={styles.sectionTitle}>Key ingredients</Text>
                {product.ingredients.map(ingredient => (
                    <Text key={ingredient} style={styles.body}>{`•  ${ingredient}`}</Text>
                ))}
            </ScrollView>

            <PressableScale style={[styles.backButton, { top: safeTop + modules.SPACE }]} onPress={props.onGoBack}>
                <BlurAndView tint="light" intensity={60} androidBackground={modules.BACKGROUND_WALL} style={StyleSheet.absoluteFill} />
                <Ionicons name="chevron-back" size={24} color={modules.TEXT} />
            </PressableScale>
        </View>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: modules.BODY_HORIZONTAL_18,
        paddingBottom: modules.BODY_HORIZONTAL_ACTION,
    },
    hero: {
        alignItems: 'center',
        marginBottom: modules.BODY_HORIZONTAL_24,
    },
    brand: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_H7,
        color: modules.SUB_TEXT,
    },
    name: {
        ...FontGSansBold,
        fontSize: modules.FONT_H3,
        color: modules.TEXT,
        marginTop: modules.SPACE,
    },
    nameKo: {
        ...fontGSans,
        fontSize: modules.FONT_H6,
        color: modules.SUB_TEXT,
        marginTop: modules.SPACE,
    },
    metaRow: {
        ..._styles.rows,
        justifyContent: 'space-between',
        marginTop: modules.BODY_HORIZONTAL,
    },
    price: {
        ...FontGSansBold,
        fontSize: modules.FONT_H4,
        color: modules.LINK,
    },
    meta: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_H6,
        color: modules.TEXT,
        marginLeft: modules.SPACE,
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: modules.GRID_SPACING,
        marginTop: modules.BODY_HORIZONTAL,
    },
    chip: {
        paddingVertical: modules.SPACE,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
        borderRadius: 100,
        backgroundColor: modules.SEARCH_BG,
    },
    chipText: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_P,
        color: modules.DARK_TEXT,
    },
    verifyBtn: {
        ..._styles.rows,
        justifyContent: 'center',
        gap: modules.GRID_SPACING,
        width: '100%',
        height: 52,
        borderRadius: modules.CARD_RADIUS,
        marginTop: modules.BODY_HORIZONTAL_24,
    },
    verifyText: {
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
        marginTop: modules.BODY_HORIZONTAL_12,
        marginBottom: modules.SPACE * 2,
    },
    body: {
        ...fontGSans,
        fontSize: modules.FONT_H6,
        lineHeight: 24,
        color: modules.DARK_TEXT,
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
