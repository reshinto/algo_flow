# Levenshtein Distance (edit distance)
# Returns the minimum number of single-character edits (insertions, deletions,
# replacements) required to transform source into target.
# Time: O(nm), Space: O(nm)

def levenshtein_distance(source: str, target: str) -> int:
    source_length = len(source)  # @step:initialize
    target_length = len(target)  # @step:initialize

    # Allocate (source_length+1) x (target_length+1) DP matrix
    dp = [[0] * (target_length + 1) for _ in range(source_length + 1)]  # @step:initialize

    # Base case: transforming empty string to target[0..j-1] requires j insertions
    for col_idx in range(target_length + 1):
        dp[0][col_idx] = col_idx  # @step:fill-table

    # Base case: transforming source[0..i-1] to empty string requires i deletions
    for row_idx in range(1, source_length + 1):
        dp[row_idx][0] = row_idx  # @step:fill-table

    # Fill the rest of the matrix
    for row_idx in range(1, source_length + 1):
        for col_idx in range(1, target_length + 1):
            source_char = source[row_idx - 1]  # @step:compare
            target_char = target[col_idx - 1]  # @step:compare

            if source_char == target_char:
                # Characters match — no new edit needed
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1]  # @step:compute-distance
            else:
                # Choose the cheapest of: replace, delete, insert
                replace_cost = dp[row_idx - 1][col_idx - 1] + 1  # @step:compute-distance
                delete_cost = dp[row_idx - 1][col_idx] + 1  # @step:compute-distance
                insert_cost = dp[row_idx][col_idx - 1] + 1  # @step:compute-distance
                dp[row_idx][col_idx] = min(replace_cost, delete_cost, insert_cost)  # @step:compute-distance

    return dp[source_length][target_length]  # @step:complete
