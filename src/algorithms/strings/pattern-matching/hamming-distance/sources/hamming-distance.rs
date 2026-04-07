// Hamming Distance
// Returns the number of positions where corresponding characters differ.
// Both strings must be equal length — returns -1 if lengths differ.
// Time: O(n), Space: O(1)

fn hamming_distance(text: &str, pattern: &str) -> i64 {
    if text.len() != pattern.len() { return -1; } // @step:initialize

    let mut distance = 0i64; // @step:initialize

    for (char_index, (text_char, pattern_char)) in text.chars().zip(pattern.chars()).enumerate() {
        let _ = char_index; // @step:visit
        if text_char != pattern_char {
            // Characters differ — increment the distance counter
            distance += 1; // @step:char-mismatch
        } else {
            // Characters match — no change to distance
            let _ = distance; // @step:char-match
        }
    }

    distance // @step:complete
}
