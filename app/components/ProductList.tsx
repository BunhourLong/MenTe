import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold, fontGSans } from '@customs/customFont'
import { Product } from 'dummy'
import { formatKRW } from 'services/format.service'
import PressableScale from 'components/PressableScale'
import ProductThumb from 'components/ProductThumb'
import { APP_TAB_HEIGHT } from 'routes/TabBar'

interface Props {
    products: Product[]
    onPress: (product: Product) => void
    ListHeaderComponent?: React.ReactElement
}

function ProductList(props: Props): React.JSX.Element {
    return (
        <FlatList
            data={props.products}
            keyExtractor={item => item.id}
            ListHeaderComponent={props.ListHeaderComponent}
            contentContainerStyle={styles.content}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
                <PressableScale style={styles.row} onPress={() => props.onPress(item)}>
                    <ProductThumb product={item} size={64} />
                    <View style={styles.info}>
                        <Text style={styles.brand} numberOfLines={1}>{item.brand}</Text>
                        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                        <Text style={styles.price}>{formatKRW(item.price)}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={modules.APPLE_CHEVRON} />
                </PressableScale>
            )}
        />
    )
}

export default ProductList

const styles = StyleSheet.create({
    content: {
        paddingBottom: APP_TAB_HEIGHT + modules.BODY_HORIZONTAL_12,
    },
    row: {
        ..._styles.rows,
        gap: modules.BODY_HORIZONTAL_12,
        paddingVertical: modules.BODY_HORIZONTAL_12,
        paddingHorizontal: modules.BODY_HORIZONTAL_18,
        backgroundColor: modules.WHITE,
    },
    info: {
        flex: 1,
    },
    brand: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_P,
        color: modules.SUB_TEXT,
    },
    name: {
        ...FontGSansBold,
        fontSize: modules.FONT_H6,
        color: modules.TEXT,
        marginTop: 2,
    },
    price: {
        ...fontGSans,
        fontSize: modules.FONT_H7,
        color: modules.LINK,
        marginTop: modules.SPACE,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: modules.BORDER_COLOR,
        marginLeft: modules.BODY_HORIZONTAL_18 + 64 + modules.BODY_HORIZONTAL_12,
    },
})
