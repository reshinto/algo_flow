// Slow Sort — multiply-and-surrender: recursively find max of halves, swap to end, sort remainder
fn slow_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize

    fn slow_sort_range(sorted_array: &mut Vec<i64>, start_index: usize, end_index: usize) {
        if start_index >= end_index {
            return;
        }

        let mid_index = (start_index + end_index) / 2;

        slow_sort_range(sorted_array, start_index, mid_index); // Sort first half
        slow_sort_range(sorted_array, mid_index + 1, end_index); // Sort second half

        // Find the maximum of both halves (now at their respective ends)
        // @step:compare
        if sorted_array[mid_index] > sorted_array[end_index] {
            // @step:swap
            sorted_array.swap(mid_index, end_index); // @step:swap
        }

        // The maximum is now at end_index — recursively sort the rest
        slow_sort_range(sorted_array, start_index, end_index - 1); // @step:mark-sorted
    }

    let len = sorted_array.len();
    if len > 0 {
        slow_sort_range(&mut sorted_array, 0, len - 1);
    }

    sorted_array // @step:complete
}
