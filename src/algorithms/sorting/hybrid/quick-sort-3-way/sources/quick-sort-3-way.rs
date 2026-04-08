// Quick Sort 3-Way — Dutch National Flag partitioning: < pivot | = pivot | > pivot
fn quick_sort_3_way(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize

    fn partition_3_way(sorted_array: &mut Vec<i64>, low: usize, high: usize) {
        if low >= high {
            return; // @step:partition
        }

        let pivot_value = sorted_array[low]; // @step:partition
        let mut less_than_pointer = low; // @step:partition
        let mut greater_than_pointer = high; // @step:partition
        let mut current_pointer = low; // @step:partition

        // Dutch National Flag partitioning
        while current_pointer <= greater_than_pointer {
            // @step:compare
            if sorted_array[current_pointer] < pivot_value {
                // @step:compare
                sorted_array.swap(less_than_pointer, current_pointer); // @step:swap
                less_than_pointer += 1; // @step:swap
                current_pointer += 1; // @step:swap
            } else if sorted_array[current_pointer] > pivot_value {
                // @step:compare
                sorted_array.swap(greater_than_pointer, current_pointer); // @step:swap
                if greater_than_pointer == 0 {
                    break;
                }
                greater_than_pointer -= 1; // @step:swap
                // Do not advance current_pointer — recheck the swapped element
            } else {
                current_pointer += 1; // @step:compare
            }
        }

        // Elements at [less_than_pointer..greater_than_pointer] are equal to pivot — mark as placed
        // @step:pivot-placed

        // Recursively sort the less-than and greater-than partitions
        if less_than_pointer > 0 {
            partition_3_way(sorted_array, low, less_than_pointer - 1); // @step:mark-sorted
        }
        partition_3_way(sorted_array, greater_than_pointer + 1, high); // @step:mark-sorted
    }

    let len = sorted_array.len();
    if len > 1 {
        partition_3_way(&mut sorted_array, 0, len - 1);
    }

    sorted_array // @step:complete
}
