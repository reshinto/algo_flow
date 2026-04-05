# Longest Common Subsequence (LCS)
# Returns the length of the longest subsequence common to both source and target.
# A subsequence preserves relative order but need not be contiguous.
# Time: O(nm), Space: O(nm)

def longest_common_subsequence(source: str, target: str) -> int:
    source_length = len(source)  # @step:initialize
    target_length = len(target)  # @step:initialize

    # Allocate (source_length+1) x (target_length+1) DP matrix, all zeroed
    dp = [[0] * (target_length + 1) for _ in range(source_length + 1)]  # @step:initialize

    # Base case: dp[0][j] = 0 (LCS of empty string and any string is 0)
    for col_idx in range(target_length + 1):
        dp[0][col_idx] = 0  # @step:fill-table

    # Base case: dp[i][0] = 0 (LCS of any string and empty string is 0)
    for row_idx in range(1, source_length + 1):
        dp[row_idx][0] = 0  # @step:fill-table

    # Fill the rest of the matrix
    for row_idx in range(1, source_length + 1):
        for col_idx in range(1, target_length + 1):
            source_char = source[row_idx - 1]  # @step:compare
            target_char = target[col_idx - 1]  # @step:compare

            if source_char == target_char:
                # Characters match — extend the LCS by 1
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1] + 1  # @step:compute-distance
            else:
                # Take the best of: skip source char or skip target char
                dp[row_idx][col_idx] = max(  # @step:compute-distance
                    dp[row_idx - 1][col_idx],
                    dp[row_idx][col_idx - 1],
                )

    return dp[source_length][target_length]  # @step:complete
