# String Rotation Check — checks if pattern is a rotation of text.
# Concatenates text with itself and searches for pattern as a substring.
# Time: O(n)  Space: O(n) for the concatenated string


def string_rotation_check(text: str, pattern: str) -> bool:
    if len(pattern) != len(text):  # @step:initialize
        return False

    concatenated = text + text  # @step:write-char

    return pattern in concatenated  # @step:visit
