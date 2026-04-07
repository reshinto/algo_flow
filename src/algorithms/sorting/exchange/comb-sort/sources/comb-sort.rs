// Comb Sort — improved bubble sort using a shrinking gap (factor 1.3) to eliminate turtles
fn comb_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    const SHRINK_FACTOR: f64 = 1.3; // @step:initialize
    let mut gap = array_length; // @step:initialize
    let mut sorted = false; // @step:initialize

    while !sorted {
        // Shrink the gap by the shrink factor
        // @step:gap-update
        gap = (gap as f64 / SHRINK_FACTOR) as usize; // @step:gap-update
        if gap <= 1 {
            gap = 1;
            sorted = true; // assume sorted until a swap proves otherwise
        }

        // Perform a pass with the current gap
        let mut start_index = 0;
        while start_index + gap < array_length {
            let compare_index = start_index + gap;
            // @step:compare
            if sorted_array[start_index] > sorted_array[compare_index] {
                // @step:swap
                sorted_array.swap(start_index, compare_index); // @step:swap
                sorted = false; // a swap occurred — need another pass
            }
            start_index += 1;
        }
    }

    // All elements are now in their sorted positions
    // @step:mark-sorted

    sorted_array // @step:complete
}
