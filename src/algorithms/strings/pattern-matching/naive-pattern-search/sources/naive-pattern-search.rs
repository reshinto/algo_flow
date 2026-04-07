// Naive (brute-force) pattern search — checks every position in text.
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Time: O(n * m) worst case where n = text length, m = pattern length
// Space: O(1) — no auxiliary data structures

fn naive_pattern_search(text: &str, pattern: &str) -> i64 {
    let text_chars: Vec<char> = text.chars().collect();
    let pattern_chars: Vec<char> = pattern.chars().collect();

    if pattern_chars.is_empty() { return 0; } // @step:initialize
    let pattern_len = pattern_chars.len();
    let text_len = text_chars.len();

    for text_idx in 0..=(text_len.saturating_sub(pattern_len)) {
        // @step:visit
        let mut pattern_idx = 0usize; // @step:visit
        while pattern_idx < pattern_len && text_chars[text_idx + pattern_idx] == pattern_chars[pattern_idx] {
            // @step:char-match
            pattern_idx += 1; // @step:char-match
        }
        if pattern_idx == pattern_len { return text_idx as i64; } // @step:complete
        // Mismatch — slide pattern right by one // @step:char-mismatch
    }
    -1 // @step:complete
}
