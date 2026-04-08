// String to Integer (atoi) — parse an integer from a string.
// Skips leading whitespace, reads optional sign, reads digits, clamps to 32-bit range.
// Time: O(n)  Space: O(1)

#include <string>
#include <climits>
#include <algorithm>

const long long INT32_MIN_VAL = -(1LL << 31);
const long long INT32_MAX_VAL = (1LL << 31) - 1;

long long stringToInteger(const std::string& text) {
    int charIndex = 0; // @step:initialize
    int length = static_cast<int>(text.length()); // @step:initialize

    // Phase 1: skip leading whitespace
    while (charIndex < length && text[charIndex] == ' ') {
        charIndex++; // @step:skip-whitespace
    }

    // Phase 2: read optional sign
    long long sign = 1; // @step:read-sign
    if (charIndex < length && text[charIndex] == '-') {
        sign = -1; // @step:read-sign
        charIndex++; // @step:read-sign
    } else if (charIndex < length && text[charIndex] == '+') {
        charIndex++; // @step:read-sign
    }

    // Phase 3: read digits and accumulate
    long long result = 0; // @step:read-digits
    while (charIndex < length) {
        int charCode = static_cast<unsigned char>(text[charIndex]); // @step:read-digits
        if (charCode < 48 || charCode > 57) break; // @step:read-digits

        long long digit = charCode - 48; // @step:write-char
        result = result * 10 + digit; // @step:write-char

        // Clamp early to avoid overflow
        if (sign == 1 && result > INT32_MAX_VAL) return INT32_MAX_VAL; // @step:write-char
        if (sign == -1 && -result < INT32_MIN_VAL) return INT32_MIN_VAL; // @step:write-char

        charIndex++; // @step:read-digits
    }

    long long finalResult = sign * result;
    return std::max(INT32_MIN_VAL, std::min(INT32_MAX_VAL, finalResult)); // @step:complete
}
