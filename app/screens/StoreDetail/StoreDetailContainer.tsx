import React from 'react'
import { NavigationV5Props } from 'interfaces/route.interface'
import { Store } from 'dummy'
import { useLocation } from 'services/location.service'
import { distanceKm, openExternalMap } from 'utils/map.utils'
import StoreDetailScreen from './StoreDetailScreen'

interface Props extends NavigationV5Props { }

const StoreDetailContainer = (props: Props): React.JSX.Element => {
    const { store } = props.route.params as { store: Store }
    const coords = useLocation(state => state.coords)

    return (
        <StoreDetailScreen
            store={store}
            distance={coords && distanceKm(coords, store.location)}
            onOpenMap={() => openExternalMap(store.location, store.name)}
            onPressProduct={product => props.navigation.navigate('PRODUCT_DETAIL', { product })}
            onVerifyProduct={product => props.navigation.navigate('VERIFY_PRODUCT', { product })}
            onGoBack={props.navigation.goBack}
        />
    )
}

export default StoreDetailContainer
