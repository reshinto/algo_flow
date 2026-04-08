// Sort Nearly Sorted — sort an array where each element is at most k positions from its sorted position
fn sort_nearly_sorted(array: &[i64], k_value: usize) -> Vec<i64> {
    let mut result: Vec<i64> = Vec::new(); // @step:initialize
    let mut heap: Vec<i64> = Vec::new(); // @step:initialize

    fn sift_up(arr: &mut Vec<i64>, mut current_idx: usize) {
        while current_idx > 0 {
            let parent_idx = (current_idx - 1) / 2; // @step:sift-up
            if arr[parent_idx] <= arr[current_idx] {
                break; // @step:compare
            }
            arr.swap(parent_idx, current_idx); // @step:heap-swap
            current_idx = parent_idx; // @step:sift-up
        }
    }

    fn sift_down(arr: &mut Vec<i64>, mut parent_idx: usize) {
        loop {
            let mut smallest_idx = parent_idx; // @step:sift-down
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            if left_idx < arr.len() && arr[left_idx] < arr[smallest_idx] {
                // @step:compare
                smallest_idx = left_idx; // @step:sift-down
            }
            if right_idx < arr.len() && arr[right_idx] < arr[smallest_idx] {
                // @step:compare
                smallest_idx = right_idx; // @step:sift-down
            }
            if smallest_idx == parent_idx {
                break; // @step:sift-down
            }
            arr.swap(parent_idx, smallest_idx); // @step:heap-swap
            parent_idx = smallest_idx; // @step:sift-down
        }
    }

    fn heap_insert(arr: &mut Vec<i64>, value: i64) {
        arr.push(value); // @step:heap-insert
        let last = arr.len() - 1;
        sift_up(arr, last);
    }

    fn heap_extract(arr: &mut Vec<i64>) -> i64 {
        let min_value = arr[0]; // @step:heap-extract
        let last_idx = arr.len() - 1; // @step:heap-extract
        arr[0] = arr[last_idx]; // @step:heap-swap
        arr.pop(); // @step:heap-extract
        if !arr.is_empty() {
            sift_down(arr, 0); // @step:sift-down
        }
        min_value
    }

    // Insert first k+1 elements into the min-heap
    let initial_count = k_value.min(array.len().saturating_sub(1));
    for insert_idx in 0..=initial_count {
        heap_insert(&mut heap, array[insert_idx]); // @step:heap-insert
    }

    // For each remaining element, extract-min to result and insert next element
    for next_idx in (k_value + 1)..array.len() {
        result.push(heap_extract(&mut heap)); // @step:heap-extract
        heap_insert(&mut heap, array[next_idx]); // @step:heap-insert
    }

    // Drain the remaining elements from the heap
    while !heap.is_empty() {
        result.push(heap_extract(&mut heap)); // @step:heap-extract
    }

    result // @step:complete
}
