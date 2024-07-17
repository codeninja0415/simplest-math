const GCD = (a: number, b: number): number => {
    if (!b) {
        return a;
    }
    return GCD(b, a % b);
};

// Simplify the final fraction
export const simplifyFraction = (numerator: number, denominator: number) => {
    const gcdValue = GCD(numerator, denominator);
    return [numerator / gcdValue, denominator / gcdValue];
};