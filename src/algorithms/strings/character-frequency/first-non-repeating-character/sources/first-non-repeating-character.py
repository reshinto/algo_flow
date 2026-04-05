# First Non-Repeating Character
# Returns the index of the first character that appears exactly once, or -1 if none.
# Time: O(n) — two passes over the string (bounded by alphabet size)
# Space: O(1) — frequency map bounded by alphabet size (26 letters)


def first_non_repeating_character(text: str) -> int:
    frequency_map: dict[str, int] = {}  # @step:initialize

    for char in text:  # @step:update-frequency
        frequency_map[char] = frequency_map.get(char, 0) + 1  # @step:update-frequency

    for char_idx, char in enumerate(text):  # @step:compare
        if frequency_map.get(char) == 1:  # @step:compare
            return char_idx  # @step:found

    return -1  # @step:complete
