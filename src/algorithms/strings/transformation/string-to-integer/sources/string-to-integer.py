# String to Integer (atoi) — parse an integer from a string.
# Skips leading whitespace, reads optional sign, reads digits, clamps to 32-bit range.
# Time: O(n)  Space: O(1)

INT32_MIN = -(2**31)
INT32_MAX = 2**31 - 1


def string_to_integer(text: str) -> int:
    char_index = 0  # @step:initialize
    length = len(text)  # @step:initialize

    # Phase 1: skip leading whitespace
    while char_index < length and text[char_index] == " ":
        char_index += 1  # @step:skip-whitespace

    # Phase 2: read optional sign
    sign = 1  # @step:read-sign
    if char_index < length and text[char_index] == "-":
        sign = -1  # @step:read-sign
        char_index += 1  # @step:read-sign
    elif char_index < length and text[char_index] == "+":
        char_index += 1  # @step:read-sign

    # Phase 3: read digits and accumulate
    result = 0  # @step:read-digits
    while char_index < length:
        char_code = ord(text[char_index])  # @step:read-digits
        if char_code < 48 or char_code > 57:  # @step:read-digits
            break

        digit = char_code - 48  # @step:write-char
        result = result * 10 + digit  # @step:write-char

        # Clamp early to avoid overflow
        if sign == 1 and result > INT32_MAX:  # @step:write-char
            return INT32_MAX
        if sign == -1 and -result < INT32_MIN:  # @step:write-char
            return INT32_MIN

        char_index += 1  # @step:read-digits

    return max(INT32_MIN, min(INT32_MAX, sign * result))  # @step:complete
