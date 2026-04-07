// Rabin-Karp Pattern Matching
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Uses a rolling polynomial hash to skip comparisons when hashes differ.
// Time: O(n + m) average, O(n * m) worst case (hash collisions)
// Space: O(1)

const HASH_BASE: i64 = 31;
const HASH_PRIME: i64 = 1_000_000_007;

fn rabin_karp_search(text: &str, pattern: &str) -> i64 {
    let text_chars: Vec<char> = text.chars().collect();
    let pattern_chars: Vec<char> = pattern.chars().collect();

    if pattern_chars.is_empty() { return 0; } // @step:initialize
    if pattern_chars.len() > text_chars.len() { return -1; } // @step:initialize

    let pattern_len = pattern_chars.len(); // @step:initialize
    let text_len = text_chars.len(); // @step:initialize

    // Compute base^(patternLen-1) % prime for rolling hash window removal
    let mut high_pow = 1i64; // @step:initialize
    for _ in 0..pattern_len - 1 {
        high_pow = (high_pow * HASH_BASE) % HASH_PRIME; // @step:initialize
    }

    // Compute hash of pattern and first window
    let mut pattern_hash = 0i64; // @step:initialize
    let mut window_hash = 0i64; // @step:initialize
    for char_idx in 0..pattern_len {
        pattern_hash = (pattern_hash * HASH_BASE + pattern_chars[char_idx] as i64) % HASH_PRIME; // @step:initialize
        window_hash = (window_hash * HASH_BASE + text_chars[char_idx] as i64) % HASH_PRIME; // @step:initialize
    }

    // Slide the window over the text
    for window_start in 0..=(text_len - pattern_len) {
        // @step:visit
        if window_hash == pattern_hash {
            // Hashes match — verify character by character to rule out false positives
            let mut char_idx = 0usize; // @step:char-match
            while char_idx < pattern_len && text_chars[window_start + char_idx] == pattern_chars[char_idx] {
                char_idx += 1; // @step:char-match
            }

            if char_idx == pattern_len {
                return window_start as i64; // @step:char-match
            }
            // Hash collision — hashes matched but characters did not
        }

        // Roll hash: remove leading character, add next character
        if window_start < text_len - pattern_len {
            let outgoing_char_code = text_chars[window_start] as i64; // @step:pattern-shift
            let incoming_char_code = text_chars[window_start + pattern_len] as i64; // @step:pattern-shift
            window_hash =
                ((window_hash - outgoing_char_code * high_pow) * HASH_BASE + incoming_char_code)
                    % HASH_PRIME; // @step:pattern-shift
            if window_hash < 0 { window_hash += HASH_PRIME; } // @step:pattern-shift
        }
    }

    -1 // @step:complete
}
