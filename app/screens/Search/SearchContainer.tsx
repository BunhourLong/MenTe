import React from 'react'
import { NavigationV5Props } from 'interfaces/route.interface'
import { PRODUCTS } from 'dummy'
import SearchScreen from './SearchScreen'

interface Props extends NavigationV5Props { }

const SearchContainer = (props: Props): React.JSX.Element => {
    const [query, setQuery] = React.useState('')

    const q = query.trim().toLowerCase()
    const products = q
        ? PRODUCTS.filter(p => [p.name, p.nameKo, p.brand, p.category, p.barcode].some(field => field.toLowerCase().includes(q)))
        : PRODUCTS

    return (
        <SearchScreen
            query={query}
            products={products}
            onChangeQuery={setQuery}
            onPressProduct={product => props.navigation.navigate('PRODUCT_DETAIL', { product })}
        />
    )
}

export default SearchContainer
