// PQ Change Priority — update element priority at a given index, then restore heap order via sift-up or sift-down
fn pq_change_priority(priority_queue: &[i64], target_index: usize, new_value: i64) -> Vec<i64> {
    let mut queue = priority_queue.to_vec(); // @step:initialize
    let old_value = queue[target_index]; // @step:heap-update
    queue[target_index] = new_value; // @step:heap-update

    if new_value < old_value {
        // Priority increased (value decreased) — sift up
        let mut current_idx = target_index; // @step:sift-up
        while current_idx > 0 {
            // @step:sift-up
            let parent_idx = (current_idx - 1) / 2; // @step:sift-up
            if queue[current_idx] >= queue[parent_idx] {
                break; // @step:compare
            }
            queue.swap(current_idx, parent_idx); // @step:heap-swap
            current_idx = parent_idx; // @step:sift-up
        }
    } else {
        // Priority decreased (value increased) — sift down
        let mut parent_idx = target_index; // @step:sift-down
        let size = queue.len();
        loop {
            // @step:sift-down
            let mut smallest_idx = parent_idx; // @step:sift-down
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            if left_idx < size && queue[left_idx] < queue[smallest_idx] {
                // @step:compare
                smallest_idx = left_idx; // @step:sift-down
            }
            if right_idx < size && queue[right_idx] < queue[smallest_idx] {
                // @step:compare
                smallest_idx = right_idx; // @step:sift-down
            }
            if smallest_idx == parent_idx {
                break; // @step:sift-down
            }
            queue.swap(parent_idx, smallest_idx); // @step:heap-swap
            parent_idx = smallest_idx; // @step:sift-down
        }
    }

    queue // @step:complete
}
