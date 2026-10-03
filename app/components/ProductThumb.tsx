import React from 'react'
import { StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import _styles from '@styles'
import modules from 'modules'
import { fontGeorgiaBold } from '@customs/customFont'
import { Product } from 'dummy'
import ImageCache from 'components/ImageCache'

// Brand-initial gradient sits underneath as the loading/error fallback; the photo covers it once loaded.
function ProductThumb({ product, size }: { product: Product; size: number }): React.JSX.Element {
    return (
        <LinearGradient
            colors={product.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.tile, { width: size, borderRadius: size / 4.5 }]}
        >
            <Text style={[styles.letter, { fontSize: size / 2.4 }]}>{product.brand[0].toUpperCase()}</Text>
            <ImageCache
                source={product.image}
                style={StyleSheet.absoluteFill}
                placeholder={null}
                contentFit="cover"
                transition={200}
                recyclingKey={product.id}
            />
        </LinearGradient>
    )
}

export default ProductThumb

const styles = StyleSheet.create({
    tile: {
        aspectRatio: 1,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: modules.BORDER_COLOR,
        ..._styles.center,
    },
    letter: {
        ...fontGeorgiaBold,
        fontStyle: 'italic',
        color: modules.WHITE,
    },
})
