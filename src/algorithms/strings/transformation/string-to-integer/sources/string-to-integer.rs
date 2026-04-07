// String to Integer (atoi) — parse an integer from a string.
// Skips leading whitespace, reads optional sign, reads digits, clamps to 32-bit range.
// Time: O(n)  Space: O(1)

const INT32_MIN: i64 = -(1 << 31);
const INT32_MAX: i64 = (1 << 31) - 1;

fn string_to_integer(text: &str) -> i64 {
    let chars: Vec<char> = text.chars().collect();
    let mut char_index = 0usize; // @step:initialize
    let length = chars.len(); // @step:initialize

    // Phase 1: skip leading whitespace
    while char_index < length && chars[char_index] == ' ' {
        char_index += 1; // @step:skip-whitespace
    }

    // Phase 2: read optional sign
    let mut sign = 1i64; // @step:read-sign
    if char_index < length && chars[char_index] == '-' {
        sign = -1; // @step:read-sign
        char_index += 1; // @step:read-sign
    } else if char_index < length && chars[char_index] == '+' {
        char_index += 1; // @step:read-sign
    }

    // Phase 3: read digits and accumulate
    let mut result = 0i64; // @step:read-digits
    while char_index < length {
        let char_code = chars[char_index] as i64; // @step:read-digits
        if char_code < 48 || char_code > 57 { break; } // @step:read-digits

        let digit = char_code - 48; // @step:write-char
        result = result * 10 + digit; // @step:write-char

        // Clamp early to avoid overflow
        if sign == 1 && result > INT32_MAX { return INT32_MAX; } // @step:write-char
        if sign == -1 && -result < INT32_MIN { return INT32_MIN; } // @step:write-char

        char_index += 1; // @step:read-digits
    }

    let final_result = sign * result;
    if final_result < INT32_MIN { INT32_MIN }
    else if final_result > INT32_MAX { INT32_MAX }
    else { final_result } // @step:complete
}
