// Find Median from Data Stream — maintain running median using two heaps
// maxHeap stores the lower half (root = largest of lower half)
// minHeap stores the upper half (root = smallest of upper half)
fn find_median_stream(stream: &[i64]) -> Vec<f64> {
    let mut max_heap: Vec<i64> = Vec::new(); // @step:initialize
    let mut min_heap: Vec<i64> = Vec::new(); // @step:initialize
    let mut medians: Vec<f64> = Vec::new(); // @step:initialize

    fn sift_up_max(heap: &mut Vec<i64>, mut idx: usize) {
        while idx > 0 {
            let parent_idx = (idx - 1) / 2; // @step:sift-up
            if heap[parent_idx] >= heap[idx] {
                break; // @step:compare
            }
            heap.swap(parent_idx, idx); // @step:heap-swap
            idx = parent_idx; // @step:sift-up
        }
    }

    fn sift_down_max(heap: &mut Vec<i64>, mut parent_idx: usize) {
        let heap_size = heap.len(); // @step:sift-down
        loop {
            let mut largest_idx = parent_idx; // @step:sift-down
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            if left_idx < heap_size && heap[left_idx] > heap[largest_idx] {
                // @step:compare
                largest_idx = left_idx; // @step:sift-down
            }
            if right_idx < heap_size && heap[right_idx] > heap[largest_idx] {
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

    fn sift_up_min(heap: &mut Vec<i64>, mut idx: usize) {
        while idx > 0 {
            let parent_idx = (idx - 1) / 2; // @step:sift-up
            if heap[parent_idx] <= heap[idx] {
                break; // @step:compare
            }
            heap.swap(parent_idx, idx); // @step:heap-swap
            idx = parent_idx; // @step:sift-up
        }
    }

    fn sift_down_min(heap: &mut Vec<i64>, mut parent_idx: usize) {
        let heap_size = heap.len(); // @step:sift-down
        loop {
            let mut smallest_idx = parent_idx; // @step:sift-down
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            if left_idx < heap_size && heap[left_idx] < heap[smallest_idx] {
                // @step:compare
                smallest_idx = left_idx; // @step:sift-down
            }
            if right_idx < heap_size && heap[right_idx] < heap[smallest_idx] {
                // @step:compare
                smallest_idx = right_idx; // @step:sift-down
            }
            if smallest_idx == parent_idx {
                break; // @step:sift-down
            }
            heap.swap(parent_idx, smallest_idx); // @step:heap-swap
            parent_idx = smallest_idx; // @step:sift-down
        }
    }

    for &num in stream {
        // Insert into appropriate heap
        if max_heap.is_empty() || num <= max_heap[0] {
            max_heap.push(num); // @step:heap-insert
            let last = max_heap.len() - 1;
            sift_up_max(&mut max_heap, last); // @step:sift-up
        } else {
            min_heap.push(num); // @step:heap-insert
            let last = min_heap.len() - 1;
            sift_up_min(&mut min_heap, last); // @step:sift-up
        }

        // Rebalance: maxHeap can be at most 1 larger than minHeap
        if max_heap.len() > min_heap.len() + 1 {
            let extracted = max_heap[0]; // @step:heap-extract
            let last_idx = max_heap.len() - 1;
            max_heap[0] = max_heap[last_idx]; // @step:heap-extract
            max_heap.pop(); // @step:heap-extract
            sift_down_max(&mut max_heap, 0); // @step:sift-down
            min_heap.push(extracted); // @step:heap-insert
            let last = min_heap.len() - 1;
            sift_up_min(&mut min_heap, last); // @step:sift-up
        } else if min_heap.len() > max_heap.len() {
            let extracted = min_heap[0]; // @step:heap-extract
            let last_idx = min_heap.len() - 1;
            min_heap[0] = min_heap[last_idx]; // @step:heap-extract
            min_heap.pop(); // @step:heap-extract
            sift_down_min(&mut min_heap, 0); // @step:sift-down
            max_heap.push(extracted); // @step:heap-insert
            let last = max_heap.len() - 1;
            sift_up_max(&mut max_heap, last); // @step:sift-up
        }

        // Compute median
        let median = if max_heap.len() == min_heap.len() {
            (max_heap[0] + min_heap[0]) as f64 / 2.0 // @step:complete
        } else {
            max_heap[0] as f64 // @step:complete
        };
        medians.push(median);
    }

    medians // @step:complete
}
