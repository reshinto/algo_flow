// Boyer-Moore Search (Bad Character Rule)
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Compares pattern right-to-left; on mismatch, shifts using the bad character table.
// Time: best O(n/m), average O(n), worst O(nm)
// Space: O(σ) where σ = alphabet size (number of distinct characters in pattern)

use std::collections::HashMap;

fn build_bad_char_table(pattern: &[char]) -> HashMap<char, i64> {
    let mut table: HashMap<char, i64> = HashMap::new(); // @step:build-bad-char

    for (char_idx, &ch) in pattern.iter().enumerate() {
        table.insert(ch, char_idx as i64); // @step:build-bad-char
    }

    table // @step:build-bad-char
}

fn boyer_moore_search(text: &str, pattern: &str) -> i64 {
    let text_chars: Vec<char> = text.chars().collect();
    let pattern_chars: Vec<char> = pattern.chars().collect();

    if pattern_chars.is_empty() { return 0; } // @step:initialize
    let bad_char_table = build_bad_char_table(&pattern_chars); // @step:initialize

    let pattern_len = pattern_chars.len(); // @step:initialize
    let text_len = text_chars.len(); // @step:initialize

    let mut alignment_offset = 0i64; // @step:initialize

    while alignment_offset <= (text_len as i64 - pattern_len as i64) {
        // @step:visit
        let mut pattern_idx = (pattern_len as i64) - 1; // @step:visit

        while pattern_idx >= 0
            && pattern_chars[pattern_idx as usize] == text_chars[(alignment_offset + pattern_idx) as usize]
        {
            pattern_idx -= 1; // @step:char-match
        }

        if pattern_idx < 0 {
            // Full pattern matched
            return alignment_offset; // @step:char-match
        }

        // Mismatch — compute shift using bad character table
        let mismatch_char = text_chars[(alignment_offset + pattern_idx) as usize]; // @step:char-mismatch
        let bad_char_shift = *bad_char_table.get(&mismatch_char).unwrap_or(&-1); // @step:char-mismatch
        let shift_amount = 1i64.max(pattern_idx - bad_char_shift); // @step:char-mismatch
        alignment_offset += shift_amount; // @step:shift-pattern
    }

    -1 // @step:complete
}
