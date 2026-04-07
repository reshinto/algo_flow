// Quick Sort (Lomuto partition) — pick last element as pivot, partition around it, recurse
fn quick_sort_lomuto(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    fn partition(arr: &mut Vec<i64>, low_index: usize, high_index: usize) -> usize {
        // @step:partition
        let pivot_value = arr[high_index]; // @step:partition
        let mut partition_index = low_index as isize - 1; // @step:partition

        for scan_index in low_index..high_index {
            // @step:compare
            if arr[scan_index] <= pivot_value {
                // @step:compare
                partition_index += 1; // @step:swap
                arr.swap(partition_index as usize, scan_index); // @step:swap
            }
        }

        // Place pivot in its final sorted position
        arr.swap((partition_index + 1) as usize, high_index); // @step:pivot-placed

        (partition_index + 1) as usize // @step:pivot-placed
    }

    fn quick_sort_recursive(arr: &mut Vec<i64>, low_index: usize, high_index: usize) {
        // @step:partition
        if low_index >= high_index {
            return; // @step:partition
        }

        let pivot_final_index = partition(arr, low_index, high_index); // @step:pivot-placed

        if pivot_final_index > 0 {
            quick_sort_recursive(arr, low_index, pivot_final_index - 1); // @step:partition
        }
        quick_sort_recursive(arr, pivot_final_index + 1, high_index); // @step:partition
    }

    if array_length > 0 {
        quick_sort_recursive(&mut sorted_array, 0, array_length - 1); // @step:partition
    }

    sorted_array // @step:complete
}
