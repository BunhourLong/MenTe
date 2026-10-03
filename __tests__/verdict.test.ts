import { getVerdict } from '../app/screens/VerifyProduct/verdict'

test('getVerdict', () => {
    expect(getVerdict([], 3)).toBe('pending')
    expect(getVerdict([true, undefined, true], 3)).toBe('pending')
    expect(getVerdict([true, true, true], 3)).toBe('authentic')
    expect(getVerdict([true, false], 3)).toBe('fake')
})
