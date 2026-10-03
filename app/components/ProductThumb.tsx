import React from 'react'
import { StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import _styles from '@styles'
import modules from 'modules'
import { fontGeorgiaBold } from '@customs/customFont'
import { Product } from 'dummy'

// ponytail: brand-initial gradient tile, swap for a product image once the data has one.
function ProductThumb({ product, size }: { product: Product; size: number }): React.JSX.Element {
    return (
        <LinearGradient
            colors={product.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.tile, { width: size, borderRadius: size / 4.5 }]}
        >
            <Text style={[styles.letter, { fontSize: size / 2.4 }]}>{product.brand[0].toUpperCase()}</Text>
        </LinearGradient>
    )
}

export default ProductThumb

const styles = StyleSheet.create({
    tile: {
        aspectRatio: 1,
        ..._styles.center,
    },
    letter: {
        ...fontGeorgiaBold,
        fontStyle: 'italic',
        color: modules.WHITE,
    },
})
