# Longest Palindromic Substring — Expand Around Center approach
# Returns the longest substring of `text` that is a palindrome.
# Time: O(n²), Space: O(1)


def longest_palindromic_substring(text: str) -> str:
    if len(text) == 0:  # @step:initialize
        return ""  # @step:initialize

    longest_start = 0  # @step:initialize
    longest_length = 1  # @step:initialize

    for center_index in range(len(text)):  # @step:expandCenter

        # Odd-length palindromes: single character as center
        odd_radius = 0  # @step:expandCenter
        while (
            center_index - odd_radius - 1 >= 0
            and center_index + odd_radius + 1 < len(text)
            and text[center_index - odd_radius - 1] == text[center_index + odd_radius + 1]  # @step:compareChars
        ):
            odd_radius += 1  # @step:charsMatch

        odd_length = 2 * odd_radius + 1  # @step:updateLongest
        if odd_length > longest_length:  # @step:updateLongest
            longest_start = center_index - odd_radius  # @step:updateLongest
            longest_length = odd_length  # @step:updateLongest

        # Even-length palindromes: gap between center_index and center_index+1
        if center_index + 1 < len(text) and text[center_index] == text[center_index + 1]:  # @step:compareChars
            even_radius = 1  # @step:charsMatch
            while (
                center_index - even_radius >= 0
                and center_index + even_radius + 1 < len(text)
                and text[center_index - even_radius] == text[center_index + even_radius + 1]  # @step:compareChars
            ):
                even_radius += 1  # @step:charsMatch

            even_length = 2 * even_radius  # @step:updateLongest
            if even_length > longest_length:  # @step:updateLongest
                longest_start = center_index - even_radius + 1  # @step:updateLongest
                longest_length = even_length  # @step:updateLongest

    return text[longest_start : longest_start + longest_length]  # @step:complete
