# Longest Common Substring
# Finds the length of the longest substring shared by both source and target.
# Uses DP: dp[row_idx][col_idx] = length of longest common substring ending at
# source[row_idx-1] and target[col_idx-1]. Resets to 0 on mismatch.
# Time: O(nm), Space: O(nm)

def longest_common_substring(source: str, target: str) -> int:
    source_length = len(source)  # @step:initialize
    target_length = len(target)  # @step:initialize

    # Allocate (source_length+1) x (target_length+1) DP matrix, all zeros
    dp = [[0] * (target_length + 1) for _ in range(source_length + 1)]  # @step:initialize

    max_length = 0  # @step:initialize

    # Fill interior cells — no base case rows needed; row/col 0 stay 0
    for row_idx in range(1, source_length + 1):
        for col_idx in range(1, target_length + 1):
            source_char = source[row_idx - 1]  # @step:compare
            target_char = target[col_idx - 1]  # @step:compare

            if source_char == target_char:
                # Characters match — extend the common substring ending here
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1] + 1  # @step:compute-distance
                if dp[row_idx][col_idx] > max_length:
                    max_length = dp[row_idx][col_idx]  # @step:compute-distance
            else:
                # Mismatch — common substring cannot extend through this cell
                dp[row_idx][col_idx] = 0  # @step:compute-distance

    return max_length  # @step:complete
