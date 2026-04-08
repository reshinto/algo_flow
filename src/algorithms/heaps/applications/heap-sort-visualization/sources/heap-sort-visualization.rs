// Heap Sort Visualization — sort using max-heap tree perspective: build heap, then extract max repeatedly
fn heap_sort_visualization(input_array: &[i64]) -> Vec<i64> {
    let mut array = input_array.to_vec(); // @step:initialize
    let array_length = array.len(); // @step:initialize

    // Phase 1: Build max-heap (bottom-up sift-down from last non-leaf)
    fn sift_down(arr: &mut Vec<i64>, heap_size: usize, mut parent_idx: usize) {
        loop {
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            let mut largest_idx = parent_idx; // @step:sift-down
            if left_idx < heap_size && arr[left_idx] > arr[largest_idx] {
                // @step:compare
                largest_idx = left_idx; // @step:sift-down
            }
            if right_idx < heap_size && arr[right_idx] > arr[largest_idx] {
                // @step:compare
                largest_idx = right_idx; // @step:sift-down
            }
            if largest_idx == parent_idx {
                break; // @step:sift-down
            }
            arr.swap(parent_idx, largest_idx); // @step:heap-swap
            parent_idx = largest_idx; // @step:sift-down
        }
    }

    // Build max-heap in-place
    if array_length > 1 {
        let last_non_leaf = array_length / 2 - 1;
        for node_idx in (0..=last_non_leaf).rev() {
            sift_down(&mut array, array_length, node_idx); // @step:sift-down
        }
    }

    // Phase 2: Extract elements one by one — swap root with last unsorted, shrink heap, sift-down
    for heap_end in (1..array_length).rev() {
        array.swap(0, heap_end); // @step:heap-swap
        sift_down(&mut array, heap_end, 0); // @step:sift-down
    }

    array // @step:complete
}
