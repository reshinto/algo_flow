# Hamming Distance
# Returns the number of positions where corresponding characters differ.
# Both strings must be equal length — returns -1 if lengths differ.
# Time: O(n), Space: O(1)


def hamming_distance(text: str, pattern: str) -> int:
    if len(text) != len(pattern):  # @step:initialize
        return -1

    distance = 0  # @step:initialize

    for char_index in range(len(text)):  # @step:visit
        if text[char_index] != pattern[char_index]:
            # Characters differ — increment the distance counter
            distance += 1  # @step:char-mismatch
        else:
            # Characters match — no change to distance
            pass  # @step:char-match

    return distance  # @step:complete
