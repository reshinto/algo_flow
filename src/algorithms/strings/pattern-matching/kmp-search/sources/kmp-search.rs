// KMP (Knuth-Morris-Pratt) Pattern Matching
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Time: O(n + m) where n = text length, m = pattern length
// Space: O(m) for the failure table

fn build_failure_table(pattern: &[char]) -> Vec<usize> {
    let mut failure = vec![0usize; pattern.len()]; // @step:build-failure
    let mut prefix_len = 0usize; // @step:build-failure
    let mut table_idx = 1usize; // @step:build-failure

    while table_idx < pattern.len() {
        if pattern[table_idx] == pattern[prefix_len] {
            prefix_len += 1; // @step:build-failure
            failure[table_idx] = prefix_len; // @step:build-failure
            table_idx += 1; // @step:build-failure
        } else if prefix_len > 0 {
            prefix_len = failure[prefix_len - 1]; // @step:build-failure
        } else {
            failure[table_idx] = 0; // @step:build-failure
            table_idx += 1; // @step:build-failure
        }
    }

    failure // @step:build-failure
}

fn kmp_search(text: &str, pattern: &str) -> i64 {
    let text_chars: Vec<char> = text.chars().collect();
    let pattern_chars: Vec<char> = pattern.chars().collect();

    if pattern_chars.is_empty() { return 0; } // @step:initialize
    let failure = build_failure_table(&pattern_chars); // @step:initialize

    let mut text_idx = 0usize; // @step:initialize
    let mut pattern_idx = 0usize; // @step:initialize

    while text_idx < text_chars.len() {
        // @step:visit
        if text_chars[text_idx] == pattern_chars[pattern_idx] {
            // Characters match — advance both pointers
            text_idx += 1; // @step:char-match
            pattern_idx += 1; // @step:char-match

            if pattern_idx == pattern_chars.len() {
                // Full pattern matched
                return (text_idx - pattern_idx) as i64; // @step:char-match
            }
        } else if pattern_idx > 0 {
            // Mismatch after some matches — use failure table to avoid redundant comparisons
            pattern_idx = failure[pattern_idx - 1]; // @step:char-mismatch
        } else {
            // Mismatch at pattern start — advance text pointer
            text_idx += 1; // @step:char-mismatch
        }
    }

    -1 // @step:complete
}
