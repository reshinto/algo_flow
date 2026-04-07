// Suffix Array Construction (naive approach)
// Generates all suffixes of a string, sorts them lexicographically,
// and returns the array of starting indices in sorted suffix order.
// Time: O(n log²n) due to string comparisons during sort, Space: O(n)

fn suffix_array_construction(text: &str) -> Vec<usize> {
    let text_length = text.len(); // @step:initialize

    if text_length == 0 {
        return vec![]; // @step:complete
    }

    // Build array of suffix starting indices [0, 1, ..., n-1]
    let mut suffix_indices: Vec<usize> = (0..text_length).collect(); // @step:initialize

    // Sort indices by their corresponding suffix lexicographically
    suffix_indices.sort_by(|&first_idx, &second_idx| {
        // @step:compare
        let first_suffix = &text[first_idx..]; // @step:compare
        let second_suffix = &text[second_idx..]; // @step:compare
        first_suffix.cmp(second_suffix) // @step:compare
    });

    suffix_indices // @step:complete
}
