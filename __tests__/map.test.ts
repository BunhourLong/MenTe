import { distanceKm, formatDistance } from '../app/utils/map.utils'

test('distanceKm', () => {
    // Phnom Penh -> Siem Reap is ~230 km as the crow flies.
    expect(Math.round(distanceKm({ latitude: 11.5564, longitude: 104.9282 }, { latitude: 13.3633, longitude: 103.8564 }))).toBe(232)
    expect(distanceKm({ latitude: 11.5, longitude: 104.9 }, { latitude: 11.5, longitude: 104.9 })).toBe(0)
})

test('formatDistance', () => {
    expect(formatDistance(0.4)).toBe('400 m')
    expect(formatDistance(12.345)).toBe('12.3 km')
})
