// Quickselect — O(n) average via Lomuto partition, recurse only on relevant half
fn quickselect(input_array: &[i32], target_k: usize) -> (i64, i64) {
    if input_array.is_empty() || target_k < 1 || target_k > input_array.len() {
        // @step:initialize
        return (-1, -1); // @step:initialize
    }

    let mut work_array = input_array.to_vec(); // @step:initialize
    let target_index = target_k - 1; // @step:initialize — 0-based index for kth smallest

    fn lomuto_partition_range(array: &mut Vec<i32>, range_start: usize, range_end: usize) -> usize {
        let pivot_value = array[range_end]; // @step:compare
        let mut boundary_index = range_start;

        for scan_index in range_start..range_end {
            if array[scan_index] <= pivot_value {
                // @step:compare
                array.swap(boundary_index, scan_index); // @step:swap
                boundary_index += 1;
            }
        }

        array.swap(boundary_index, range_end); // @step:swap
        boundary_index
    }

    fn select_kth(
        array: &mut Vec<i32>,
        range_start: usize,
        range_end: usize,
        target_position: usize,
    ) -> i32 {
        if range_start == range_end {
            // @step:compare
            return array[range_start]; // @step:compare
        }

        let pivot_final_index = lomuto_partition_range(array, range_start, range_end); // @step:compare

        if pivot_final_index == target_position {
            // @step:compare
            return array[pivot_final_index]; // @step:compare
        } else if target_position < pivot_final_index {
            return select_kth(array, range_start, pivot_final_index - 1, target_position); // @step:compare
        } else {
            return select_kth(array, pivot_final_index + 1, range_end, target_position); // @step:compare
        }
    }

    let last_index = work_array.len() - 1;
    let kth_element = select_kth(&mut work_array, 0, last_index, target_index);
    let pivot_index = work_array.iter().position(|&val| val == kth_element).unwrap_or(0);

    (kth_element as i64, pivot_index as i64) // @step:complete
}
