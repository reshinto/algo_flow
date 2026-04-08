// Top-K Frequent Elements (Heap) — find k most frequent elements using a min-heap of size k
fn top_k_frequent_heap(array: &[i64], k_value: usize) -> Vec<i64> {
    use std::collections::HashMap;

    // Count frequencies of each element
    let mut frequency_map: HashMap<i64, usize> = HashMap::new(); // @step:initialize
    for &element in array {
        // @step:initialize
        *frequency_map.entry(element).or_insert(0) += 1; // @step:initialize
    }

    // Min-heap: each entry is (frequency, element), heap ordered by frequency
    let mut heap: Vec<(usize, i64)> = Vec::new(); // @step:initialize
    let entries: Vec<(i64, usize)> = frequency_map.into_iter().collect(); // @step:initialize

    // Process each unique element
    for (element, frequency) in &entries {
        if heap.len() < k_value {
            // Heap not full — insert and sift up
            heap.push((*frequency, *element)); // @step:heap-insert
            let mut child_idx = heap.len() - 1; // @step:sift-up
            while child_idx > 0 {
                // @step:sift-up
                let parent_idx = (child_idx - 1) / 2; // @step:sift-up
                if heap[parent_idx].0 <= heap[child_idx].0 {
                    break; // @step:compare
                }
                heap.swap(parent_idx, child_idx); // @step:heap-swap
                child_idx = parent_idx; // @step:sift-up
            }
        } else if *frequency > heap[0].0 {
            // Current freq beats root (lowest in heap) — replace root and sift down
            heap[0] = (*frequency, *element); // @step:heap-extract
            let mut parent_idx = 0usize; // @step:sift-down
            loop {
                // @step:sift-down
                let mut smallest_idx = parent_idx; // @step:sift-down
                let left_idx = 2 * parent_idx + 1; // @step:sift-down
                let right_idx = 2 * parent_idx + 2; // @step:sift-down
                if left_idx < heap.len() && heap[left_idx].0 < heap[smallest_idx].0 {
                    // @step:compare
                    smallest_idx = left_idx; // @step:sift-down
                }
                if right_idx < heap.len() && heap[right_idx].0 < heap[smallest_idx].0 {
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
    }

    // Extract elements from the heap (the k most frequent)
    heap.into_iter().map(|(_, element)| element).collect() // @step:complete
}
