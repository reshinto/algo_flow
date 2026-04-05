# Palindrome Check — Two-pointer approach
# Returns True if the string reads the same forwards and backwards.
# Time: O(n), Space: O(1)


def palindrome_check(text: str) -> bool:
    left_index = 0  # @step:initialize
    right_index = len(text) - 1  # @step:initialize

    while left_index < right_index:  # @step:compare
        if text[left_index] != text[right_index]:  # @step:compare
            return False  # @step:mismatch
        left_index += 1  # @step:match
        right_index -= 1  # @step:match

    return True  # @step:complete
