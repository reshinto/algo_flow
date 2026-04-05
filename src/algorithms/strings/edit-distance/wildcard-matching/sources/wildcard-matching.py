# Wildcard Matching
# Determines if a text string matches a pattern that may contain '?' (any single character)
# or '*' (any sequence of characters, including empty).
# Uses dynamic programming: dp[row_idx][col_idx] = 1 if text[0..row_idx-1] matches pattern[0..col_idx-1].
# Time: O(nm), Space: O(nm)

def wildcard_matching(text: str, pattern: str) -> bool:
    text_length = len(text)  # @step:initialize
    pattern_length = len(pattern)  # @step:initialize

    # Allocate (text_length+1) x (pattern_length+1) DP matrix (1 = True, 0 = False)
    dp = [[0] * (pattern_length + 1) for _ in range(text_length + 1)]  # @step:initialize

    # Base case: empty text matches empty pattern
    dp[0][0] = 1  # @step:fill-table

    # Base case: empty text can only match a pattern of all '*'
    for col_idx in range(1, pattern_length + 1):
        dp[0][col_idx] = 1 if pattern[col_idx - 1] == "*" and dp[0][col_idx - 1] == 1 else 0  # @step:fill-table

    # Fill the rest of the matrix
    for row_idx in range(1, text_length + 1):
        for col_idx in range(1, pattern_length + 1):
            text_char = text[row_idx - 1]  # @step:compare
            pattern_char = pattern[col_idx - 1]  # @step:compare

            if pattern_char == "*":
                # '*' matches empty sequence (dp[row_idx][col_idx-1]) or one more char (dp[row_idx-1][col_idx])
                match_empty = dp[row_idx][col_idx - 1]  # @step:compute-distance
                match_one = dp[row_idx - 1][col_idx]  # @step:compute-distance
                dp[row_idx][col_idx] = 1 if match_empty == 1 or match_one == 1 else 0  # @step:compute-distance
            elif pattern_char == "?" or pattern_char == text_char:
                # '?' matches any single char, or exact character match
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1]  # @step:compute-distance
            else:
                dp[row_idx][col_idx] = 0  # @step:compute-distance

    return dp[text_length][pattern_length] == 1  # @step:complete
