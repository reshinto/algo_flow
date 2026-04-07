// Wildcard Matching
// Determines if a text string matches a pattern that may contain '?' (any single character)
// or '*' (any sequence of characters, including empty).
// Uses dynamic programming: dp[rowIdx][colIdx] = true if text[0..rowIdx-1] matches pattern[0..colIdx-1].
// Time: O(nm), Space: O(nm) where n = text.length, m = pattern.length

fn wildcard_matching(text: &str, pattern: &str) -> bool {
    let text_chars: Vec<char> = text.chars().collect();
    let pattern_chars: Vec<char> = pattern.chars().collect();
    let text_length = text_chars.len(); // @step:initialize
    let pattern_length = pattern_chars.len(); // @step:initialize

    // Allocate (textLength+1) × (patternLength+1) boolean DP matrix (stored as 1/0)
    let mut dp: Vec<Vec<u8>> = vec![vec![0; pattern_length + 1]; text_length + 1]; // @step:initialize

    // Base case: empty text matches empty pattern
    dp[0][0] = 1; // @step:fill-table

    // Base case: empty text can only match a pattern of all '*'
    for col_idx in 1..=pattern_length {
        dp[0][col_idx] = if pattern_chars[col_idx - 1] == '*' { dp[0][col_idx - 1] } else { 0 }; // @step:fill-table
    }

    // Fill the rest of the matrix
    for row_idx in 1..=text_length {
        for col_idx in 1..=pattern_length {
            let text_char = text_chars[row_idx - 1]; // @step:compare
            let pattern_char = pattern_chars[col_idx - 1]; // @step:compare

            if pattern_char == '*' {
                // '*' matches empty sequence (dp[rowIdx][colIdx-1]) or one more char (dp[rowIdx-1][colIdx])
                let match_empty = dp[row_idx][col_idx - 1]; // @step:compute-distance
                let match_one = dp[row_idx - 1][col_idx]; // @step:compute-distance
                dp[row_idx][col_idx] = if match_empty == 1 || match_one == 1 { 1 } else { 0 }; // @step:compute-distance
            } else if pattern_char == '?' || pattern_char == text_char {
                // '?' matches any single char, or exact character match
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1]; // @step:compute-distance
            } else {
                dp[row_idx][col_idx] = 0; // @step:compute-distance
            }
        }
    }

    dp[text_length][pattern_length] == 1 // @step:complete
}
