// Jaro-Winkler Similarity
// Computes similarity between two strings using the Jaro formula,
// then boosts the score if the strings share a common prefix (up to 4 chars).
// Returns a value between 0.0 (completely dissimilar) and 1.0 (identical).
// Time: O(nm), Space: O(n) where n and m are the string lengths.

fn jaro_winkler_similarity(source: &str, target: &str) -> f64 {
    let source_chars: Vec<char> = source.chars().collect();
    let target_chars: Vec<char> = target.chars().collect();
    let source_length = source_chars.len(); // @step:initialize
    let target_length = target_chars.len(); // @step:initialize

    // Identical strings have similarity 1.0
    if source == target { return 1.0; } // @step:initialize

    // Either empty string has similarity 0.0
    if source_length == 0 || target_length == 0 { return 0.0; } // @step:initialize

    // Match window: characters within this distance can be considered matching
    let match_window = (source_length.max(target_length) / 2).saturating_sub(1); // @step:initialize

    let mut source_matched = vec![false; source_length]; // @step:initialize
    let mut target_matched = vec![false; target_length]; // @step:initialize

    let mut match_count = 0usize; // @step:initialize

    // Find matching characters within the match window
    for source_idx in 0..source_length {
        // @step:compare
        let window_start = source_idx.saturating_sub(match_window); // @step:compare
        let window_end = (source_idx + match_window).min(target_length - 1); // @step:compare

        for target_idx in window_start..=window_end {
            // @step:compare
            if !target_matched[target_idx] && source_chars[source_idx] == target_chars[target_idx] {
                // @step:compare
                source_matched[source_idx] = true; // @step:compute-distance
                target_matched[target_idx] = true; // @step:compute-distance
                match_count += 1; // @step:compute-distance
                break;
            }
        }
    }

    // No matches means similarity is 0
    if match_count == 0 { return 0.0; } // @step:compute-distance

    // Count transpositions: matched chars in different order
    let mut transposition_count = 0usize; // @step:compute-distance
    let mut target_scan_idx = 0usize; // @step:compute-distance

    for source_idx in 0..source_length {
        // @step:compute-distance
        if !source_matched[source_idx] { continue; } // @step:compute-distance

        while !target_matched[target_scan_idx] {
            // @step:compute-distance
            target_scan_idx += 1; // @step:compute-distance
        }

        if source_chars[source_idx] != target_chars[target_scan_idx] {
            // @step:compute-distance
            transposition_count += 1; // @step:compute-distance
        }

        target_scan_idx += 1; // @step:compute-distance
    }

    // Jaro similarity formula
    let half_transpositions = transposition_count as f64 / 2.0; // @step:compute-distance
    let jaro_score =
        (match_count as f64 / source_length as f64 // @step:compute-distance
            + match_count as f64 / target_length as f64 // @step:compute-distance
            + (match_count as f64 - half_transpositions) / match_count as f64) // @step:compute-distance
        / 3.0; // @step:compute-distance

    // Count common prefix length (up to 4 characters)
    let max_prefix_length = 4usize; // @step:compute-distance
    let mut prefix_length = 0usize; // @step:compute-distance

    for prefix_idx in 0..max_prefix_length.min(source_length).min(target_length) {
        // @step:compute-distance
        if source_chars[prefix_idx] == target_chars[prefix_idx] {
            // @step:compute-distance
            prefix_length += 1; // @step:compute-distance
        } else {
            break; // @step:compute-distance
        }
    }

    // Winkler bonus: reward common prefix
    let winkler_bonus = prefix_length as f64 * 0.1 * (1.0 - jaro_score); // @step:compute-distance
    let jaro_winkler_score = jaro_score + winkler_bonus; // @step:compute-distance

    (jaro_winkler_score * 10000.0).round() / 10000.0 // @step:complete
}
