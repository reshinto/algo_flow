// Stooge Sort — recursive: swap first/last if needed, sort first 2/3, last 2/3, first 2/3 again
fn stooge_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize

    fn stooge_sort_range(sorted_array: &mut Vec<i64>, start_index: usize, end_index: usize) {
        if start_index >= end_index {
            return;
        }

        // @step:compare
        if sorted_array[start_index] > sorted_array[end_index] {
            // @step:swap
            sorted_array.swap(start_index, end_index); // @step:swap
        }

        let range_length = end_index - start_index + 1;
        if range_length > 2 {
            let third_length = range_length / 3;

            stooge_sort_range(sorted_array, start_index, end_index - third_length); // Sort first 2/3
            stooge_sort_range(sorted_array, start_index + third_length, end_index); // Sort last 2/3
            stooge_sort_range(sorted_array, start_index, end_index - third_length); // Sort first 2/3 again
        }
    }

    let len = sorted_array.len();
    if len > 0 {
        stooge_sort_range(&mut sorted_array, 0, len - 1);
    }

    // @step:mark-sorted

    sorted_array // @step:complete
}
