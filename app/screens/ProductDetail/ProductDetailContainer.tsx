import React from 'react'
import { NavigationV5Props } from 'interfaces/route.interface'
import { Product } from 'dummy'
import ProductDetailScreen from './ProductDetailScreen'

interface Props extends NavigationV5Props { }

const ProductDetailContainer = (props: Props): React.JSX.Element => {
    const { product } = props.route.params as { product: Product }

    return (
        <ProductDetailScreen
            product={product}
            onVerify={() => props.navigation.navigate('VERIFY_PRODUCT', { product })}
            onGoBack={props.navigation.goBack}
        />
    )
}

export default ProductDetailContainer
