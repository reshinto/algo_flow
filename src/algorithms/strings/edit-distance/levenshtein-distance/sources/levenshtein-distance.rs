// Levenshtein Distance (edit distance)
// Returns the minimum number of single-character edits (insertions, deletions,
// replacements) required to transform source into target.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

fn levenshtein_distance(source: &str, target: &str) -> usize {
    let source_chars: Vec<char> = source.chars().collect();
    let target_chars: Vec<char> = target.chars().collect();
    let source_length = source_chars.len(); // @step:initialize
    let target_length = target_chars.len(); // @step:initialize

    // Allocate (sourceLength+1) × (targetLength+1) DP matrix
    let mut dp: Vec<Vec<usize>> = vec![vec![0; target_length + 1]; source_length + 1]; // @step:initialize

    // Base case: transforming empty string to target[0..j-1] requires j insertions
    for col_idx in 0..=target_length {
        dp[0][col_idx] = col_idx; // @step:fill-table
    }

    // Base case: transforming source[0..i-1] to empty string requires i deletions
    for row_idx in 1..=source_length {
        dp[row_idx][0] = row_idx; // @step:fill-table
    }

    // Fill the rest of the matrix
    for row_idx in 1..=source_length {
        for col_idx in 1..=target_length {
            let source_char = source_chars[row_idx - 1]; // @step:compare
            let target_char = target_chars[col_idx - 1]; // @step:compare

            if source_char == target_char {
                // Characters match — no new edit needed
                dp[row_idx][col_idx] = dp[row_idx - 1][col_idx - 1]; // @step:compute-distance
            } else {
                // Choose the cheapest of: replace, delete, insert
                let replace_cost = dp[row_idx - 1][col_idx - 1] + 1; // @step:compute-distance
                let delete_cost = dp[row_idx - 1][col_idx] + 1; // @step:compute-distance
                let insert_cost = dp[row_idx][col_idx - 1] + 1; // @step:compute-distance
                dp[row_idx][col_idx] = replace_cost.min(delete_cost).min(insert_cost); // @step:compute-distance
            }
        }
    }

    dp[source_length][target_length] // @step:complete
}
