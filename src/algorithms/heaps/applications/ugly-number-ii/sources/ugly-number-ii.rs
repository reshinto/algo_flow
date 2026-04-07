// Ugly Number II — find the nth ugly number (only prime factors 2, 3, 5) using a min-heap
fn ugly_number_ii(nth_position: usize) -> i64 {
    use std::collections::HashSet;

    let mut heap: Vec<i64> = vec![1]; // @step:initialize
    let mut seen: HashSet<i64> = [1].iter().cloned().collect(); // @step:initialize
    let prime_factors = [2i64, 3, 5]; // @step:initialize
    let mut current_ugly = 1i64; // @step:initialize

    fn sift_up(heap_arr: &mut Vec<i64>, mut current_idx: usize) {
        while current_idx > 0 {
            let parent_idx = (current_idx - 1) / 2; // @step:sift-up
            if heap_arr[current_idx] < heap_arr[parent_idx] {
                // @step:compare
                heap_arr.swap(current_idx, parent_idx); // @step:heap-swap
                current_idx = parent_idx; // @step:sift-up
            } else {
                break; // @step:compare
            }
        }
    }

    fn sift_down(heap_arr: &mut Vec<i64>, heap_size: usize, mut parent_idx: usize) {
        loop {
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            let mut smallest_idx = parent_idx; // @step:sift-down
            if left_idx < heap_size && heap_arr[left_idx] < heap_arr[smallest_idx] {
                // @step:compare
                smallest_idx = left_idx; // @step:sift-down
            }
            if right_idx < heap_size && heap_arr[right_idx] < heap_arr[smallest_idx] {
                // @step:compare
                smallest_idx = right_idx; // @step:sift-down
            }
            if smallest_idx == parent_idx {
                break; // @step:sift-down
            }
            heap_arr.swap(parent_idx, smallest_idx); // @step:heap-swap
            parent_idx = smallest_idx; // @step:sift-down
        }
    }

    for _ in 0..nth_position {
        // Extract minimum (root)
        current_ugly = heap[0]; // @step:heap-extract
        let last_idx = heap.len() - 1;
        heap[0] = heap[last_idx]; // @step:heap-extract
        heap.pop(); // @step:heap-extract
        let heap_len = heap.len();
        sift_down(&mut heap, heap_len, 0); // @step:sift-down
        // Generate next candidates by multiplying by 2, 3, 5
        for &factor in &prime_factors {
            let candidate = current_ugly * factor; // @step:heap-insert
            if !seen.contains(&candidate) {
                seen.insert(candidate); // @step:heap-insert
                heap.push(candidate); // @step:heap-insert
                let last = heap.len() - 1;
                sift_up(&mut heap, last); // @step:sift-up
            }
        }
    }

    current_ugly // @step:complete
}
