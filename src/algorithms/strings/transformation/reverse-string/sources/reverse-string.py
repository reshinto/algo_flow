# Reverse String — two-pointer in-place swap on a character list.
# Returns the reversed version of the input string.
# Time: O(n)  Space: O(1) auxiliary (O(n) for the output string)


def reverse_string(text: str) -> str:
    chars = list(text)  # @step:initialize

    left_index = 0  # @step:initialize
    right_index = len(chars) - 1  # @step:initialize

    while left_index < right_index:
        left_char = chars[left_index]  # @step:read-char
        right_char = chars[right_index]  # @step:read-char

        chars[left_index] = right_char  # @step:swap-pointers
        chars[right_index] = left_char  # @step:swap-pointers

        left_index += 1  # @step:visit
        right_index -= 1  # @step:visit

    return "".join(chars)  # @step:complete
