export function createOTP(digits: number): number {
    // a six digit random number
    const otp = Math.floor(Math.random() * 10**digits)
    return otp;
}