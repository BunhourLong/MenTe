import React from 'react'
import { Text, TextProps } from 'react-native'
import { formatPriceRange, PriceRange } from 'services/format.service'
import { useCurrency } from 'services/currency.service'

// A product's price range in the currency picked in Profile; re-renders when it changes.
function Price({ price, ...props }: TextProps & { price: PriceRange }): React.JSX.Element {
    const currency = useCurrency(state => state.currency)
    return <Text numberOfLines={1} adjustsFontSizeToFit {...props}>{formatPriceRange(price, currency)}</Text>
}

export default Price
