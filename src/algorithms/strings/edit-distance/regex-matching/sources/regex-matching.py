# Regular Expression Matching
# Determines if text matches a pattern that may contain '.' (any single character)
# or '*' (zero or more of the preceding element).
# Uses dynamic programming: dp[row_idx][col_idx] = 1 if text[0..row_idx-1] matches pattern[0..col_idx-1].
# Time: O(nm), Space: O(nm)

def regex_matching(text: str, pattern: str) -> bool:
    text_length = len(text)  # @step:initialize
    pattern_length = len(pattern)  # @step:initialize

    # Allocate (text_length+1) x (pattern_length+1) DP matrix (1 = True, 0 = False)
    dp = [[0] * (pattern_length + 1) for _ in range(text_length + 1)]  # @step:initialize

    # Base case: empty text matches empty pattern
    dp[0][0] = 1  # @step:fill-table

    # Base case: empty text can match patterns like "a*", "a*b*", etc.
    for col_idx in range(2, pattern_length + 1):
        if pattern[col_idx - 1] == "*":
            dp[0][col_idx] = dp[0][col_idx - 2]  # @step:fill-table

    # Fill the rest of the matrix
    for row_idx in range(1, text_length + 1):
        for col_idx in range(1, pattern_length + 1):
            text_char = text[row_idx - 1]  # @step:compare
            pattern_char = pattern[col_idx - 1]  # @step:compare

            if pattern_char == "*":
                # '*' with preceding element: zero occurrences or one more char
                zero_occurrences = dp[row_idx][col_idx - 2]  # @step:compute-distance
                preceding_char = pattern[col_idx - 2] if col_idx >= 2 else ""
                char_matches = preceding_char == "." or preceding_char == text_char
                one_more = dp[row_idx - 1][col_idx] if char_matches else 0  # @step:compute-distance
                dp[row_idx][col_idx] = 1 if zero_occurrences == 1 or one_more == 1 else 0  # @step:compute-distance
            elif pattern_char == "." or pattern_char == text_char:
                # '.' matches any single char, or exact character match
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1]  # @step:compute-distance
            else:
                dp[row_idx][col_idx] = 0  # @step:compute-distance

    return dp[text_length][pattern_length] == 1  # @step:complete
