// String to Integer (atoi) — parse an integer from a string.
// Skips leading whitespace, reads optional sign, reads digits, clamps to 32-bit range.
// Time: O(n)  Space: O(1)

public class StringToInteger {

    public static int stringToInteger(String text) {
        int charIndex = 0; // @step:initialize
        int length = text.length(); // @step:initialize

        // Phase 1: skip leading whitespace
        while (charIndex < length && text.charAt(charIndex) == ' ') {
            charIndex++; // @step:skip-whitespace
        }

        // Phase 2: read optional sign
        int sign = 1; // @step:read-sign
        if (charIndex < length && text.charAt(charIndex) == '-') {
            sign = -1; // @step:read-sign
            charIndex++; // @step:read-sign
        } else if (charIndex < length && text.charAt(charIndex) == '+') {
            charIndex++; // @step:read-sign
        }

        // Phase 3: read digits and accumulate
        long result = 0; // @step:read-digits
        while (charIndex < length) {
            int charCode = text.charAt(charIndex); // @step:read-digits
            if (charCode < 48 || charCode > 57) break; // @step:read-digits

            int digit = charCode - 48; // @step:write-char
            result = result * 10 + digit; // @step:write-char

            // Clamp early to avoid overflow
            if (sign == 1 && result > Integer.MAX_VALUE) return Integer.MAX_VALUE; // @step:write-char
            if (sign == -1 && -result < Integer.MIN_VALUE) return Integer.MIN_VALUE; // @step:write-char

            charIndex++; // @step:read-digits
        }

        return (int) Math.max(Integer.MIN_VALUE, Math.min(Integer.MAX_VALUE, sign * result)); // @step:complete
    }
}
