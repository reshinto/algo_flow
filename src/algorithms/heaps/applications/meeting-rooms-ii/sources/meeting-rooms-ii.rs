// Meeting Rooms II — find minimum number of meeting rooms required using a min-heap of end times
fn meeting_rooms_ii(intervals: &[(i64, i64)]) -> usize {
    if intervals.is_empty() {
        return 0; // @step:initialize
    }

    // Sort meetings by start time
    let mut sorted = intervals.to_vec(); // @step:initialize
    sorted.sort_by_key(|meeting| meeting.0); // @step:initialize

    // Min-heap tracking end times of active meetings (room occupied until end time)
    let mut end_time_heap: Vec<i64> = Vec::new(); // @step:initialize

    for &(start_time, end_time) in &sorted {
        if !end_time_heap.is_empty() && end_time_heap[0] <= start_time {
            // A room is free — extract its end time and reuse the room
            let last_idx = end_time_heap.len() - 1;
            end_time_heap[0] = end_time_heap[last_idx]; // @step:heap-extract
            end_time_heap.pop(); // @step:heap-extract
            // Sift down to restore min-heap property after root replacement
            let mut parent_idx = 0usize; // @step:sift-down
            loop {
                let mut smallest_idx = parent_idx; // @step:sift-down
                let left_idx = 2 * parent_idx + 1; // @step:sift-down
                let right_idx = 2 * parent_idx + 2; // @step:sift-down
                if left_idx < end_time_heap.len() && end_time_heap[left_idx] < end_time_heap[smallest_idx] {
                    // @step:compare
                    smallest_idx = left_idx;
                }
                if right_idx < end_time_heap.len() && end_time_heap[right_idx] < end_time_heap[smallest_idx] {
                    // @step:compare
                    smallest_idx = right_idx;
                }
                if smallest_idx == parent_idx {
                    break; // @step:sift-down
                }
                end_time_heap.swap(parent_idx, smallest_idx); // @step:heap-swap
                parent_idx = smallest_idx; // @step:sift-down
            }
        }

        // Insert current meeting's end time into the heap (allocate room)
        end_time_heap.push(end_time); // @step:heap-insert
        let mut current_idx = end_time_heap.len() - 1; // @step:heap-insert
        // Sift up to restore min-heap property
        while current_idx > 0 {
            // @step:sift-up
            let parent_idx = (current_idx - 1) / 2; // @step:sift-up
            if end_time_heap[current_idx] >= end_time_heap[parent_idx] {
                break; // @step:compare
            }
            end_time_heap.swap(current_idx, parent_idx); // @step:heap-swap
            current_idx = parent_idx; // @step:sift-up
        }
    }

    end_time_heap.len() // @step:complete
}
