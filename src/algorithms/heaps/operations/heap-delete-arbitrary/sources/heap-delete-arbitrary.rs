// Heap Delete Arbitrary — remove a node at any index from a min-heap in O(log n)
fn heap_delete_arbitrary(input_array: &[i64], target_index: usize) -> Vec<i64> {
    let mut array = input_array.to_vec(); // @step:initialize
    let last_index = array.len() - 1; // @step:initialize

    // Replace target with the last element, then shrink the heap
    array[target_index] = array[last_index]; // @step:heap-extract
    array.pop(); // @step:heap-extract

    if target_index >= array.len() {
        return array; // @step:complete
    }

    let parent_index = if target_index > 0 { (target_index - 1) / 2 } else { 0 }; // @step:sift-up

    // If new value is smaller than its parent, sift up; otherwise sift down
    if target_index > 0 && array[target_index] < array[parent_index] {
        // @step:sift-up
        sift_up(&mut array, target_index); // @step:sift-up
    } else {
        let size = array.len();
        sift_down(&mut array, target_index, size); // @step:sift-down
    }

    array // @step:complete
}

fn sift_up(array: &mut Vec<i64>, start_index: usize) {
    let mut current_index = start_index; // @step:sift-up
    while current_index > 0 {
        let parent_index = (current_index - 1) / 2; // @step:sift-up
        if array[current_index] >= array[parent_index] {
            break; // @step:compare
        }
        // Swap current with parent
        array.swap(current_index, parent_index); // @step:heap-swap
        current_index = parent_index; // @step:sift-up
    }
}

fn sift_down(array: &mut Vec<i64>, start_index: usize, size: usize) {
    let mut parent_index = start_index; // @step:sift-down
    loop {
        let mut smallest_index = parent_index; // @step:sift-down
        let left_index = 2 * parent_index + 1; // @step:sift-down
        let right_index = 2 * parent_index + 2; // @step:sift-down
        if left_index < size && array[left_index] < array[smallest_index] {
            // @step:compare
            smallest_index = left_index; // @step:sift-down
        }
        if right_index < size && array[right_index] < array[smallest_index] {
            // @step:compare
            smallest_index = right_index; // @step:sift-down
        }
        if smallest_index == parent_index {
            break; // @step:sift-down
        }
        // Swap parent with smallest child
        array.swap(parent_index, smallest_index); // @step:heap-swap
        parent_index = smallest_index; // @step:sift-down
    }
}
