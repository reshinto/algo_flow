// Longest Repeated Substring
// Finds the longest substring that appears at least twice in the string.
// Uses a DP matrix comparing the string against itself, where dp[rowIdx][colIdx]
// represents the length of the longest common suffix of text[0..rowIdx-1] and text[0..colIdx-1].
// The diagonal (rowIdx === colIdx) is skipped to avoid trivial self-matches.
// Time: O(n²), Space: O(n²)

fn longest_repeated_substring(text: &str) -> String {
    let text_chars: Vec<char> = text.chars().collect();
    let text_length = text_chars.len(); // @step:initialize

    // Allocate (textLength+1) × (textLength+1) DP matrix
    let mut dp: Vec<Vec<usize>> = vec![vec![0; text_length + 1]; text_length + 1]; // @step:initialize

    let mut longest_length = 0usize; // @step:initialize
    let mut longest_end_index = 0usize; // @step:initialize

    // Fill the DP matrix — skip diagonal (rowIdx === colIdx) to avoid self-overlap
    for row_idx in 1..=text_length {
        for col_idx in 1..=text_length {
            if row_idx == col_idx { continue; } // @step:compare — skip self-match on diagonal

            let row_char = text_chars[row_idx - 1]; // @step:compare
            let col_char = text_chars[col_idx - 1]; // @step:compare

            if row_char == col_char {
                // Characters match — extend the common suffix length
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1] + 1; // @step:compute-distance
            } else {
                dp[row_idx][col_idx] = 0; // @step:compute-distance
            }

            if dp[row_idx][col_idx] > longest_length {
                longest_length = dp[row_idx][col_idx]; // @step:compute-distance
                longest_end_index = row_idx; // @step:compute-distance
            }
        }
    }

    text_chars[longest_end_index - longest_length..longest_end_index]
        .iter()
        .collect() // @step:complete
}
