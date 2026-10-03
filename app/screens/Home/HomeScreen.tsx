import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import _styles from '@styles'
import modules, { IMAGES } from 'modules'
import { FontGSansBold, fontGeorgiaBold } from '@customs/customFont'
import ProductList from 'components/ProductList'
import { Product } from 'dummy'

interface Props {
  products: Product[]
  onPressProduct: (product: Product) => void
}

function HomeScreen(props: Props): React.JSX.Element {
  return (
    <SafeAreaView edges={['top']} style={_styles.containerWhite}>
      <View style={styles.brand}>
        <Image source={IMAGES.LOGO} style={styles.logo} contentFit="contain" />
        <Text style={styles.brandName} numberOfLines={1}>Men<Text style={styles.brandAccent}>Te</Text></Text>
      </View>

      <ProductList
        products={props.products}
        onPress={props.onPressProduct}
        ListHeaderComponent={<Text style={styles.prompt}>Tap Scan to scan a product</Text>}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  brand: {
    ..._styles.rows,
    gap: modules.BODY_HORIZONTAL_12 / 2,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
    marginTop: modules.BODY_HORIZONTAL / 3,
  },
  logo: {
    width: 60,
    height: 60,
  },
  brandName: {
    ...fontGeorgiaBold,
    flexShrink: 1,
    fontStyle: 'italic',
    color: modules.TEXT,
    fontSize: modules.FONT_H3,
  },
  brandAccent: {
    color: modules.BRAND_TEAL,
  },
  prompt: {
    ...FontGSansBold,
    color: modules.BRAND_DEEP,
    fontSize: modules.FONT_H2,
    lineHeight: 36,
    marginHorizontal: modules.BODY_HORIZONTAL_18,
    marginVertical: modules.BODY_HORIZONTAL_12,
  },
})
