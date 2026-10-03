import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, fontGSans } from '@customs/customFont'
import { Product } from 'dummy'
import ProductList from 'components/ProductList'

interface Props {
    query: string
    products: Product[]
    onChangeQuery: (text: string) => void
    onPressProduct: (product: Product) => void
}

const SearchScreen = (props: Props): React.JSX.Element => {
    return (
        <SafeAreaView edges={['top']} style={_styles.containerWhite}>
            <Text style={styles.title}>Search</Text>
            <View style={styles.searchBox}>
                <Ionicons name="search" size={18} color={modules.TEXT_NOTE} />
                <TextInput
                    style={styles.input}
                    value={props.query}
                    onChangeText={props.onChangeQuery}
                    placeholder="Search name, brand, 한글 or barcode"
                    placeholderTextColor={modules.TEXT_NOTE}
                    returnKeyType="search"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                />
            </View>
            {props.products.length ? (
                <ProductList products={props.products} onPress={props.onPressProduct} />
            ) : (
                <View style={[_styles.flx1, _styles.center]}>
                    <Text style={styles.empty}>{`No results for "${props.query}"`}</Text>
                </View>
            )}
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    title: {
        ...FontGSansBold,
        fontSize: modules.FONT_H1,
        color: modules.TEXT,
        paddingHorizontal: modules.BODY_HORIZONTAL_18,
        paddingTop: modules.BODY_HORIZONTAL_12,
    },
    searchBox: {
        ..._styles.rows,
        gap: modules.GRID_SPACING,
        height: 44,
        marginTop: modules.BODY_HORIZONTAL_12,
        marginHorizontal: modules.BODY_HORIZONTAL_18,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
        borderRadius: modules.CARD_RADIUS,
        backgroundColor: modules.SEARCH_BG,
    },
    input: {
        ...fontGSans,
        flex: 1,
        fontSize: modules.FONT_H6,
        color: modules.TEXT,
    },
    empty: {
        ...fontGSans,
        fontSize: modules.FONT_H6,
        color: modules.SUB_TEXT,
    },
})
