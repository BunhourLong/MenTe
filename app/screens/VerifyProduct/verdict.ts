export type Verdict = 'pending' | 'authentic' | 'fake'

// One failed check is enough to call it fake; authentic needs every check confirmed.
export function getVerdict(answers: (boolean | undefined)[], total: number): Verdict {
    if (answers.some(a => a === false)) return 'fake'
    if (answers.filter(a => a === true).length === total) return 'authentic'
    return 'pending'
}
