import React from 'react'
import { NavigationV5Props } from 'interfaces/route.interface'
import { STORES } from 'dummy'
import { useHookLanguage } from 'services/i18n.services'
import { useLocation } from 'services/location.service'
import { distanceKm } from 'utils/map.utils'
import HomeScreen from './HomeScreen'

interface Props extends NavigationV5Props { }

const HomeContainer = (props: Props): React.JSX.Element => {
    useHookLanguage()
    const coords = useLocation(state => state.coords)

    // Nearest first once we know where the user is; the JSON order otherwise.
    const stores = React.useMemo(() => {
        const withDistance = STORES.map(store => ({ ...store, distance: coords && distanceKm(coords, store.location) }))
        return coords ? withDistance.sort((a, b) => a.distance! - b.distance!) : withDistance
    }, [coords])

    return (
        <HomeScreen
            stores={stores}
            onPressStore={store => props.navigation.navigate('STORE_DETAIL', { store })}
        />
    )
}

export default HomeContainer
