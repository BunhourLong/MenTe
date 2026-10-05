import * as Location from 'expo-location'
import { create } from 'zustand'
import { LatLng } from 'utils/map.utils'

// undefined until granted; screens just leave distances out.
export const useLocation = create<{ coords?: LatLng }>(() => ({}))

// Asked once at launch (routes/index).
export async function requestLocation() {
    const { granted } = await Location.requestForegroundPermissionsAsync()
    if (!granted) return
    const position = (await Location.getLastKnownPositionAsync()) ?? (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }))
    useLocation.setState({ coords: position.coords })
}
