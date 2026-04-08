// Find Peak Element — binary search on slope to find a peak in O(log n)
fn find_peak_element(array: &[i32]) -> usize {
    // @step:initialize
    let mut low_index = 0usize; // @step:initialize
    let mut high_index = array.len() - 1; // @step:initialize

    while low_index < high_index {
        let mid_index = low_index + (high_index - low_index) / 2; // @step:compare
        let mid_value = array[mid_index]; // @step:compare
        let next_value = array[mid_index + 1]; // @step:compare

        if mid_value < next_value {
            // @step:eliminate
            // Slope is ascending — peak must be to the right
            low_index = mid_index + 1; // @step:eliminate
        } else {
            // @step:eliminate
            // Slope is descending or flat — peak is at mid or to the left
            high_index = mid_index; // @step:eliminate
        }
    }

    low_index // @step:found,complete
}
