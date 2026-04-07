// PQ Dequeue — remove and return the highest-priority (smallest) element from a min-heap priority queue
fn pq_dequeue(priority_queue: &[i64]) -> (i64, Vec<i64>) {
    let mut queue = priority_queue.to_vec(); // @step:initialize
    let dequeued_value = queue[0]; // @step:heap-extract
    let last_idx = queue.len() - 1; // @step:heap-extract
    // Move last element to root and remove the last position
    queue.swap(0, last_idx); // @step:heap-swap
    queue.pop(); // @step:heap-extract
    // Sift down the new root to restore heap property
    let size = queue.len();
    let mut parent_idx = 0usize; // @step:sift-down
    loop {
        // @step:sift-down
        let mut smallest_idx = parent_idx; // @step:sift-down
        let left_idx = 2 * parent_idx + 1; // @step:sift-down
        let right_idx = 2 * parent_idx + 2; // @step:sift-down
        // Find the smallest among parent, left child, and right child
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
        // Swap parent with highest-priority child
        queue.swap(parent_idx, smallest_idx); // @step:heap-swap
        parent_idx = smallest_idx; // @step:sift-down
    }
    (dequeued_value, queue) // @step:complete
}
