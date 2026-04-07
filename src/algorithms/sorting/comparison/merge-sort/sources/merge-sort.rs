// Merge Sort — divide array in half recursively, then merge sorted halves
fn merge_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    fn merge_sort_recursive(arr: &mut Vec<i64>, left_start: usize, right_end: usize) {
        // @step:divide
        if right_end - left_start <= 1 {
            return; // @step:divide
        }

        let mid_point = (left_start + right_end) / 2; // @step:divide

        merge_sort_recursive(arr, left_start, mid_point); // @step:divide
        merge_sort_recursive(arr, mid_point, right_end); // @step:divide

        // Merge the two sorted halves
        let left_half = arr[left_start..mid_point].to_vec(); // @step:merge
        let right_half = arr[mid_point..right_end].to_vec(); // @step:merge

        let mut left_index = 0usize; // @step:merge
        let mut right_index = 0usize; // @step:merge
        let mut merge_position = left_start; // @step:merge

        while left_index < left_half.len() && right_index < right_half.len() {
            // @step:compare
            if left_half[left_index] <= right_half[right_index] {
                // @step:compare
                arr[merge_position] = left_half[left_index]; // @step:swap
                left_index += 1; // @step:swap
            } else {
                arr[merge_position] = right_half[right_index]; // @step:swap
                right_index += 1; // @step:swap
            }
            merge_position += 1; // @step:swap
        }

        while left_index < left_half.len() {
            // @step:merge
            arr[merge_position] = left_half[left_index]; // @step:merge
            left_index += 1; // @step:merge
            merge_position += 1; // @step:merge
        }

        while right_index < right_half.len() {
            // @step:merge
            arr[merge_position] = right_half[right_index]; // @step:merge
            right_index += 1; // @step:merge
            merge_position += 1; // @step:merge
        }
    }

    merge_sort_recursive(&mut sorted_array, 0, array_length); // @step:divide

    sorted_array // @step:complete
}
