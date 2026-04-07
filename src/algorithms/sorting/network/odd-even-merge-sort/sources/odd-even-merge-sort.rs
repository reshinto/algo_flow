// Odd-Even Merge Sort — Batcher's odd-even transposition sort (correct for all sizes)
fn odd_even_merge_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:complete
    }

    // Batcher's odd-even transposition sort:
    // Alternates between odd-phase and even-phase compare-swap passes
    // Requires ceil(n/2) * 2 rounds to sort n elements
    let total_rounds = ((array_length + 1) / 2) * 2; // @step:merge

    for round_index in 0..total_rounds {
        // @step:compare
        let is_odd_round = round_index % 2 == 0; // @step:compare
        let start_index = if is_odd_round { 0 } else { 1 }; // @step:compare

        let mut left_index = start_index;
        while left_index + 1 < array_length {
            // @step:compare
            if sorted_array[left_index] > sorted_array[left_index + 1] {
                // @step:swap
                sorted_array.swap(left_index, left_index + 1); // @step:swap
            }
            left_index += 2;
        }
    }

    // @step:mark-sorted

    sorted_array // @step:complete
}
