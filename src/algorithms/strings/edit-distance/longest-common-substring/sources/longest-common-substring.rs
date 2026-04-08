// Longest Common Substring
// Finds the length of the longest substring shared by both source and target.
// Uses DP: dp[rowIdx][colIdx] = length of longest common substring ending at
// source[rowIdx-1] and target[colIdx-1]. Resets to 0 on mismatch.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

fn longest_common_substring(source: &str, target: &str) -> usize {
    let source_chars: Vec<char> = source.chars().collect();
    let target_chars: Vec<char> = target.chars().collect();
    let source_length = source_chars.len(); // @step:initialize
    let target_length = target_chars.len(); // @step:initialize

    // Allocate (sourceLength+1) × (targetLength+1) DP matrix, all zeros
    let mut dp: Vec<Vec<usize>> = vec![vec![0; target_length + 1]; source_length + 1]; // @step:initialize

    let mut max_length = 0usize; // @step:initialize

    // Fill interior cells — no base case rows needed; row/col 0 stay 0
    for row_idx in 1..=source_length {
        for col_idx in 1..=target_length {
            let source_char = source_chars[row_idx - 1]; // @step:compare
            let target_char = target_chars[col_idx - 1]; // @step:compare

            if source_char == target_char {
                // Characters match — extend the common substring ending here
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1] + 1; // @step:compute-distance
                if dp[row_idx][col_idx] > max_length {
                    max_length = dp[row_idx][col_idx]; // @step:compute-distance
                }
            } else {
                // Mismatch — common substring cannot extend through this cell
                dp[row_idx][col_idx] = 0; // @step:compute-distance
            }
        }
    }

    max_length // @step:complete
}
