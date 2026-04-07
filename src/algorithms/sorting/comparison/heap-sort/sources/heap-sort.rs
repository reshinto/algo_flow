// Heap Sort — build a max-heap, then repeatedly extract the maximum
fn heap_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    fn sift_down(arr: &mut Vec<i64>, root_index: usize, heap_size: usize) {
        // @step:compare
        let mut largest_index = root_index; // @step:compare
        let left_child = 2 * root_index + 1; // @step:compare
        let right_child = 2 * root_index + 2; // @step:compare

        if left_child < heap_size && arr[left_child] > arr[largest_index] {
            // @step:compare
            largest_index = left_child; // @step:compare
        }

        if right_child < heap_size && arr[right_child] > arr[largest_index] {
            // @step:compare
            largest_index = right_child; // @step:compare
        }

        if largest_index != root_index {
            // @step:swap
            arr.swap(root_index, largest_index); // @step:swap

            sift_down(arr, largest_index, heap_size); // @step:swap
        }
    }

    // Phase 1: Build the max-heap by sifting down from the last internal node
    if array_length >= 2 {
        for build_index in (0..=(array_length / 2).saturating_sub(1)).rev() {
            // @step:build-heap
            sift_down(&mut sorted_array, build_index, array_length); // @step:build-heap
        }
    }

    // Phase 2: Extract maximum elements one by one
    for extract_index in (1..array_length).rev() {
        // @step:extract
        sorted_array.swap(0, extract_index); // @step:extract

        // Restore heap property after moving max to its sorted position
        sift_down(&mut sorted_array, 0, extract_index); // @step:compare

        // The element at extract_index is now permanently sorted
        // @step:mark-sorted
    }

    sorted_array // @step:complete
}
