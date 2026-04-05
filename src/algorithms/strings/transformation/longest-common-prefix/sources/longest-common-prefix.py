# Longest Common Prefix — vertical scanning column by column across all strings.
# Returns the longest prefix shared by every word in the input list.
# Time: O(n*m) where n = number of strings, m = min string length  Space: O(1)


def longest_common_prefix(words: list[str]) -> str:
    if not words:  # @step:initialize
        return ""  # @step:initialize

    prefix_length = 0  # @step:initialize
    first_word = words[0]  # @step:initialize

    for column_index in range(len(first_word)):
        current_char = first_word[column_index]  # @step:read-char

        for word_index in range(1, len(words)):
            word = words[word_index]  # @step:read-char
            if column_index >= len(word) or word[column_index] != current_char:  # @step:read-char
                return first_word[:prefix_length]  # @step:complete

        prefix_length += 1  # @step:write-char

    return first_word[:prefix_length]  # @step:complete
