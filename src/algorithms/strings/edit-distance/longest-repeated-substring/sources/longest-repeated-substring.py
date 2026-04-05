# Longest Repeated Substring
# Finds the longest substring that appears at least twice in the string.
# Uses a DP matrix comparing the string against itself, where dp[row_idx][col_idx]
# represents the length of the longest common suffix of text[0..row_idx-1] and text[0..col_idx-1].
# The diagonal (row_idx === col_idx) is skipped to avoid trivial self-matches.
# Time: O(n²), Space: O(n²)

def longest_repeated_substring(text: str) -> str:
    text_length = len(text)  # @step:initialize

    # Allocate (text_length+1) x (text_length+1) DP matrix
    dp = [[0] * (text_length + 1) for _ in range(text_length + 1)]  # @step:initialize

    longest_length = 0  # @step:initialize
    longest_end_index = 0  # @step:initialize

    # Fill the DP matrix — skip diagonal (row_idx === col_idx) to avoid self-overlap
    for row_idx in range(1, text_length + 1):
        for col_idx in range(1, text_length + 1):
            if row_idx == col_idx:
                continue  # @step:compare — skip self-match on diagonal

            row_char = text[row_idx - 1]  # @step:compare
            col_char = text[col_idx - 1]  # @step:compare

            if row_char == col_char:
                # Characters match — extend the common suffix length
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1] + 1  # @step:compute-distance
            else:
                dp[row_idx][col_idx] = 0  # @step:compute-distance

            if dp[row_idx][col_idx] > longest_length:
                longest_length = dp[row_idx][col_idx]  # @step:compute-distance
                longest_end_index = row_idx  # @step:compute-distance

    return text[longest_end_index - longest_length:longest_end_index]  # @step:complete
