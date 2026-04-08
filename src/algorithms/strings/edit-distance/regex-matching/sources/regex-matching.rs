// Regular Expression Matching
// Determines if text matches a pattern that may contain '.' (any single character)
// or '*' (zero or more of the preceding element).
// Uses dynamic programming: dp[rowIdx][colIdx] = true if text[0..rowIdx-1] matches pattern[0..colIdx-1].
// Time: O(nm), Space: O(nm) where n = text.length, m = pattern.length

fn regex_matching(text: &str, pattern: &str) -> bool {
    let text_chars: Vec<char> = text.chars().collect();
    let pattern_chars: Vec<char> = pattern.chars().collect();
    let text_length = text_chars.len(); // @step:initialize
    let pattern_length = pattern_chars.len(); // @step:initialize

    // Allocate (textLength+1) × (patternLength+1) boolean DP matrix (stored as 1/0)
    let mut dp: Vec<Vec<u8>> = vec![vec![0; pattern_length + 1]; text_length + 1]; // @step:initialize

    // Base case: empty text matches empty pattern
    dp[0][0] = 1; // @step:fill-table

    // Base case: empty text can match patterns like "a*", "a*b*", etc.
    for col_idx in 2..=pattern_length {
        if pattern_chars[col_idx - 1] == '*' {
            dp[0][col_idx] = dp[0][col_idx - 2]; // @step:fill-table
        }
    }

    // Fill the rest of the matrix
    for row_idx in 1..=text_length {
        for col_idx in 1..=pattern_length {
            let text_char = text_chars[row_idx - 1]; // @step:compare
            let pattern_char = pattern_chars[col_idx - 1]; // @step:compare

            if pattern_char == '*' {
                // '*' with preceding element: zero occurrences (skip two pattern chars) or one more char
                let zero_occurrences = dp[row_idx][col_idx - 2]; // @step:compute-distance
                let preceding_char = if col_idx >= 2 { Some(pattern_chars[col_idx - 2]) } else { None };
                let char_matches = preceding_char == Some('.') || preceding_char == Some(text_char);
                let one_more = if char_matches { dp[row_idx - 1][col_idx] } else { 0 }; // @step:compute-distance
                dp[row_idx][col_idx] = if zero_occurrences == 1 || one_more == 1 { 1 } else { 0 }; // @step:compute-distance
            } else if pattern_char == '.' || pattern_char == text_char {
                // '.' matches any single char, or exact character match
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1]; // @step:compute-distance
            } else {
                dp[row_idx][col_idx] = 0; // @step:compute-distance
            }
        }
    }

    dp[text_length][pattern_length] == 1 // @step:complete
}
