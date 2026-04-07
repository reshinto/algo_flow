// Longest Common Subsequence (LCS)
// Returns the length of the longest subsequence common to both source and target.
// A subsequence preserves relative order but need not be contiguous.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

fn longest_common_subsequence(source: &str, target: &str) -> usize {
    let source_chars: Vec<char> = source.chars().collect();
    let target_chars: Vec<char> = target.chars().collect();
    let source_length = source_chars.len(); // @step:initialize
    let target_length = target_chars.len(); // @step:initialize

    // Allocate (sourceLength+1) × (targetLength+1) DP matrix, all zeroed
    let mut dp: Vec<Vec<usize>> = vec![vec![0; target_length + 1]; source_length + 1]; // @step:initialize

    // Base case: dp[0][j] = 0 (LCS of empty string and any string is 0)
    for col_idx in 0..=target_length {
        dp[0][col_idx] = 0; // @step:fill-table
    }

    // Base case: dp[i][0] = 0 (LCS of any string and empty string is 0)
    for row_idx in 1..=source_length {
        dp[row_idx][0] = 0; // @step:fill-table
    }

    // Fill the rest of the matrix
    for row_idx in 1..=source_length {
        for col_idx in 1..=target_length {
            let source_char = source_chars[row_idx - 1]; // @step:compare
            let target_char = target_chars[col_idx - 1]; // @step:compare

            if source_char == target_char {
                // Characters match — extend the LCS by 1
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1] + 1; // @step:compute-distance
            } else {
                // Take the best of: skip source char or skip target char
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx].max(dp[row_idx][col_idx - 1]); // @step:compute-distance
            }
        }
    }

    dp[source_length][target_length] // @step:complete
}
