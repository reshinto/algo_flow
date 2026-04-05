# Z-Algorithm Pattern Matching
# Concatenates pattern + "$" + text, builds Z-array where Z[i] = length of longest substring
# starting at i that matches a prefix of the combined string.
# If Z[i] == len(pattern), pattern found at position i - len(pattern) - 1 in the text.
# Time: O(n + m) where n = text length, m = pattern length
# Space: O(n + m) for the combined string and Z-array


def z_algorithm(text: str, pattern: str) -> int:
    if len(pattern) == 0:  # @step:initialize
        return 0
    combined = pattern + "$" + text  # @step:initialize
    combined_length = len(combined)  # @step:initialize
    z_array = [0] * combined_length  # @step:initialize

    window_left = 0  # @step:initialize
    window_right = 0  # @step:initialize

    for pos in range(1, combined_length):  # @step:build-failure
        if pos < window_right:
            z_array[pos] = min(window_right - pos, z_array[pos - window_left])  # @step:build-failure

        while (
            pos + z_array[pos] < combined_length
            and combined[z_array[pos]] == combined[pos + z_array[pos]]
        ):
            z_array[pos] += 1  # @step:build-failure

        if pos + z_array[pos] > window_right:
            window_left = pos  # @step:build-failure
            window_right = pos + z_array[pos]  # @step:build-failure

        if z_array[pos] == len(pattern):
            return pos - len(pattern) - 1  # @step:char-match

    return -1  # @step:complete
