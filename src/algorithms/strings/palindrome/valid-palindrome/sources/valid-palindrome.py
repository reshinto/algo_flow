# Valid Palindrome — Two-pointer approach ignoring non-alphanumeric characters
# Returns True if the string is a palindrome when only alphanumeric characters are considered.
# Time: O(n), Space: O(1)


def valid_palindrome(text: str) -> bool:
    left_index = 0  # @step:initialize
    right_index = len(text) - 1  # @step:initialize

    while left_index < right_index:
        while left_index < right_index and not text[left_index].isalnum():
            left_index += 1  # @step:skipNonAlphanumeric
        while left_index < right_index and not text[right_index].isalnum():
            right_index -= 1  # @step:skipNonAlphanumeric

        if text[left_index].lower() != text[right_index].lower():  # @step:compare
            return False  # @step:mismatch
        left_index += 1  # @step:match
        right_index -= 1  # @step:match

    return True  # @step:complete
