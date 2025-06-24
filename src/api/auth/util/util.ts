export function createOTP(digits: number): number {
    // a six digit random number
    
    const min = 10 ** (digits - 1); // 100000
    const max = 10 ** digits - 1;   // 999999

    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // const otp = Math.floor(Math.random() * 10**digits)
    return code;
}