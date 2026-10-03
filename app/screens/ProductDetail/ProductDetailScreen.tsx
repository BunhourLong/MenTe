import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold, fontGSans } from '@customs/customFont'
import { Product } from 'dummy'
import Price from 'components/Price'
import BlurAndView from 'components/BlurAndView'
import PressableScale from 'components/PressableScale'
import ImageViewer from 'components/ImageViewer'
import ButtonPrimary from 'components/ButtonPrimary'
import AppBackground from 'components/AppBackground'

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
            <AppBackground />
            <ScrollView contentContainerStyle={[styles.content, { paddingTop: safeTop + 42 + modules.BODY_HORIZONTAL_24 }]}>
                <View style={styles.hero}>
                    <ImageViewer source={product.image} style={styles.heroImage} contentFit="cover" />
                </View>

                <Text style={styles.brand}>{product.brand}</Text>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.nameKo}>{product.nameKo}</Text>

                <View style={styles.metaRow}>
                    <Price style={styles.price} price={product.price} />
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
    heroImage: {
        width: 160,
        height: 160,
        borderRadius: 160 / 4.5,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: modules.BORDER_COLOR,
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
        flexShrink: 1,
        marginRight: modules.BODY_HORIZONTAL_12,
        fontSize: modules.FONT_H4,
        color: modules.PRIMARY,
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
        backgroundColor: modules.WHITE,
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
