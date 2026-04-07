// Dual-Pivot Quick Sort — two pivots create three partitions: < pivot1 | pivot1..pivot2 | > pivot2
fn dual_pivot_quick_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize

    fn partition(sorted_array: &mut Vec<i64>, low: usize, high: usize) {
        if low >= high {
            return; // @step:partition
        }

        // Ensure pivot1 <= pivot2
        if sorted_array[low] > sorted_array[high] {
            // @step:partition
            sorted_array.swap(low, high); // @step:partition
        }

        let pivot1 = sorted_array[low]; // @step:partition
        let pivot2 = sorted_array[high]; // @step:partition

        let mut less_than_pointer = low + 1; // @step:partition
        let mut greater_than_pointer = high - 1; // @step:partition
        let mut current_pointer = low + 1; // @step:partition

        while current_pointer <= greater_than_pointer {
            // @step:compare
            if sorted_array[current_pointer] < pivot1 {
                // @step:compare
                sorted_array.swap(less_than_pointer, current_pointer); // @step:swap
                less_than_pointer += 1; // @step:swap
                current_pointer += 1; // @step:swap
            } else if sorted_array[current_pointer] > pivot2 {
                // @step:compare
                // Find the rightmost non-greater element
                while greater_than_pointer > current_pointer && sorted_array[greater_than_pointer] > pivot2 {
                    // @step:compare
                    greater_than_pointer -= 1; // @step:compare
                }
                sorted_array.swap(greater_than_pointer, current_pointer); // @step:swap
                greater_than_pointer -= 1; // @step:swap
                // Recheck current_pointer
            } else {
                current_pointer += 1; // @step:compare
            }
        }

        // Place pivot1 and pivot2 in their final positions
        less_than_pointer -= 1; // @step:pivot-placed
        greater_than_pointer += 1; // @step:pivot-placed

        sorted_array.swap(low, less_than_pointer); // @step:pivot-placed
        sorted_array.swap(high, greater_than_pointer); // @step:pivot-placed

        // Both pivots are now at their final sorted positions
        // @step:mark-sorted

        // Recursively sort three partitions
        if less_than_pointer > 0 {
            partition(sorted_array, low, less_than_pointer - 1); // @step:mark-sorted
        }
        partition(sorted_array, less_than_pointer + 1, greater_than_pointer - 1); // @step:mark-sorted
        partition(sorted_array, greater_than_pointer + 1, high); // @step:mark-sorted
    }

    let len = sorted_array.len();
    if len > 1 {
        partition(&mut sorted_array, 0, len - 1);
    }

    sorted_array // @step:complete
}
