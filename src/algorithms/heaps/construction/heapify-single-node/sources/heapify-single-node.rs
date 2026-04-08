// Heapify Single Node — demonstrate sift-down on a single subtree root to its correct position
fn heapify_single_node(input_array: &[i64], target_index: usize) -> Vec<i64> {
    let mut array = input_array.to_vec(); // @step:initialize
    let size = array.len(); // @step:initialize
    sift_down(&mut array, target_index, size); // @step:sift-down
    array // @step:complete
}

fn sift_down(array: &mut Vec<i64>, start_idx: usize, size: usize) {
    let mut parent_idx = start_idx; // @step:sift-down
    loop {
        let mut smallest_idx = parent_idx; // @step:sift-down
        let left_idx = 2 * parent_idx + 1; // @step:sift-down
        let right_idx = 2 * parent_idx + 2; // @step:sift-down
        // Find the smallest among parent, left child, and right child
        if left_idx < size && array[left_idx] < array[smallest_idx] {
            // @step:sift-down
            smallest_idx = left_idx; // @step:sift-down
        }
        if right_idx < size && array[right_idx] < array[smallest_idx] {
            // @step:sift-down
            smallest_idx = right_idx; // @step:sift-down
        }
        if smallest_idx == parent_idx {
            break; // @step:sift-down
        }
        // Swap parent with the smallest child
        array.swap(parent_idx, smallest_idx); // @step:heap-swap
        parent_idx = smallest_idx; // @step:sift-down
    }
}
