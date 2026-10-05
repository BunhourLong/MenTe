import { Linking, Platform } from 'react-native'

export type LatLng = { latitude: number; longitude: number }

// Opens the Google Maps app on the location; falls back to Google Maps on the web when the app isn't installed.
export function openExternalMap({ latitude, longitude }: LatLng, label: string) {
    const web = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    // Android: Maps claims this https link itself. iOS: needs its own scheme.
    if (Platform.OS === 'android') return Linking.openURL(web)
    return Linking.openURL(`comgooglemaps://?q=${encodeURIComponent(label)}&center=${latitude},${longitude}`).catch(() => Linking.openURL(web))
}

// Straight-line (haversine) distance, not driving distance.
export function distanceKm(a: LatLng, b: LatLng): number {
    const rad = (deg: number) => (deg * Math.PI) / 180
    const h = Math.sin(rad(b.latitude - a.latitude) / 2) ** 2
        + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(rad(b.longitude - a.longitude) / 2) ** 2
    return 2 * 6371 * Math.asin(Math.sqrt(h))
}

export function formatDistance(km: number): string {
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`
}
