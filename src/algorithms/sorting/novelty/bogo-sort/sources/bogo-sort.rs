// Bogo Sort — randomly shuffle until sorted; uses seeded LCG PRNG for determinism
fn bogo_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    let max_iterations = 100usize; // @step:initialize

    // Seeded linear congruential generator for deterministic behavior
    let mut seed: u64 = 42; // @step:initialize
    let mut next_random = || -> usize {
        seed = seed.wrapping_mul(1103515245).wrapping_add(12345) & 0x7fffffff;
        seed as usize
    };

    let is_sorted = |arr: &[i64]| -> bool {
        // @step:check-sorted
        for check_index in 0..arr.len().saturating_sub(1) {
            // @step:compare
            if arr[check_index] > arr[check_index + 1] {
                // @step:compare
                return false; // @step:compare
            }
        }
        true // @step:check-sorted
    };

    let mut iteration_count = 0usize;
    while !is_sorted(&sorted_array) && iteration_count < max_iterations {
        // Shuffle the array
        // @step:shuffle
        for shuffle_index in (1..array_length).rev() {
            // @step:shuffle
            let swap_target = next_random() % (shuffle_index + 1); // @step:shuffle
            sorted_array.swap(shuffle_index, swap_target); // @step:swap
        }
        iteration_count += 1;
    }

    // @step:mark-sorted

    sorted_array // @step:complete
}
