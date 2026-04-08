// K Closest Points to Origin — use a max-heap of size k (by distance²) to find the k nearest points
fn k_closest_points(points: &[(i64, i64)], k_value: usize) -> Vec<(i64, i64)> {
    // Build a max-heap of (distance², point) pairs capped at size k
    let mut heap: Vec<(i64, (i64, i64))> = Vec::new(); // @step:initialize

    fn distance_squared(point: (i64, i64)) -> i64 {
        point.0 * point.0 + point.1 * point.1 // @step:initialize
    }

    fn sift_up(heap: &mut Vec<(i64, (i64, i64))>, mut current_idx: usize) {
        while current_idx > 0 {
            let parent_idx = (current_idx - 1) / 2; // @step:sift-up
            if heap[current_idx].0 > heap[parent_idx].0 {
                // @step:compare
                heap.swap(current_idx, parent_idx); // @step:heap-swap
                current_idx = parent_idx; // @step:sift-up
            } else {
                break; // @step:compare
            }
        }
    }

    fn sift_down(heap: &mut Vec<(i64, (i64, i64))>, heap_size: usize, mut parent_idx: usize) {
        loop {
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            let mut largest_idx = parent_idx; // @step:sift-down
            if left_idx < heap_size && heap[left_idx].0 > heap[largest_idx].0 {
                // @step:compare
                largest_idx = left_idx; // @step:sift-down
            }
            if right_idx < heap_size && heap[right_idx].0 > heap[largest_idx].0 {
                // @step:compare
                largest_idx = right_idx; // @step:sift-down
            }
            if largest_idx == parent_idx {
                break; // @step:sift-down
            }
            heap.swap(parent_idx, largest_idx); // @step:heap-swap
            parent_idx = largest_idx; // @step:sift-down
        }
    }

    for &point in points {
        let dist = distance_squared(point); // @step:heap-insert
        if heap.len() < k_value {
            heap.push((dist, point)); // @step:heap-insert
            let last = heap.len() - 1;
            sift_up(&mut heap, last); // @step:sift-up
        } else if !heap.is_empty() && dist < heap[0].0 {
            // Current point is closer than the farthest in heap — replace root
            heap[0] = (dist, point); // @step:heap-extract
            let heap_len = heap.len();
            sift_down(&mut heap, heap_len, 0); // @step:sift-down
        }
    }

    heap.into_iter().map(|(_, point)| point).collect() // @step:complete
}
