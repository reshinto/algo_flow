// Z-Algorithm Pattern Matching
// Concatenates pattern + "$" + text, builds Z-array where Z[i] = length of longest substring
// starting at i that matches a prefix of the combined string.
// If Z[i] == pattern.length, pattern found at position i - pattern.length - 1 in the text.
// Time: O(n + m) where n = text length, m = pattern length
// Space: O(n + m) for the combined string and Z-array

fn z_algorithm(text: &str, pattern: &str) -> i64 {
    if pattern.is_empty() { return 0; } // @step:initialize
    let combined: Vec<char> = format!("{}${}", pattern, text).chars().collect(); // @step:initialize
    let combined_length = combined.len(); // @step:initialize
    let pattern_length = pattern.chars().count();
    let mut z_array = vec![0usize; combined_length]; // @step:initialize

    let mut window_left = 0usize; // @step:initialize
    let mut window_right = 0usize; // @step:initialize

    for pos in 1..combined_length {
        // @step:build-failure
        if pos < window_right {
            z_array[pos] = (window_right - pos).min(z_array[pos - window_left]); // @step:build-failure
        }

        while pos + z_array[pos] < combined_length
            && combined[z_array[pos]] == combined[pos + z_array[pos]]
        {
            z_array[pos] += 1; // @step:build-failure
        }

        if pos + z_array[pos] > window_right {
            window_left = pos; // @step:build-failure
            window_right = pos + z_array[pos]; // @step:build-failure
        }

        if z_array[pos] == pattern_length {
            return (pos - pattern_length - 1) as i64; // @step:char-match
        }
    }

    -1 // @step:complete
}
