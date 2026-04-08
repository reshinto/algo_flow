// PQ Enqueue — insert an element into a min-heap-based priority queue and restore heap order via sift-up
fn pq_enqueue(priority_queue: &[i64], value: i64) -> Vec<i64> {
    let mut queue = priority_queue.to_vec(); // @step:initialize
    queue.push(value); // @step:heap-insert
    let mut current_idx = queue.len() - 1; // @step:heap-insert
    // Sift up: bubble the new element toward the root until heap property holds
    while current_idx > 0 {
        // @step:sift-up
        let parent_idx = (current_idx - 1) / 2; // @step:sift-up
        if queue[current_idx] >= queue[parent_idx] {
            break; // @step:compare
        }
        // New element has higher priority (smaller value) — swap with parent
        queue.swap(current_idx, parent_idx); // @step:heap-swap
        current_idx = parent_idx; // @step:sift-up
    }
    queue // @step:complete
}
