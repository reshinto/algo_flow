// Reorganize String — rearrange string so no two adjacent characters are the same (LeetCode 767)
fn reorganize_string(text: &str) -> String {
    use std::collections::HashMap;

    // Count character frequencies
    let mut frequency_map: HashMap<char, i64> = HashMap::new(); // @step:initialize
    for character in text.chars() {
        *frequency_map.entry(character).or_insert(0) += 1; // @step:initialize
    }

    // Build max-heap entries: (frequency, character)
    let mut heap: Vec<(i64, char)> = Vec::new(); // @step:initialize
    for (&character, &frequency) in &frequency_map {
        heap.push((frequency, character)); // @step:heap-insert
    }

    fn sift_up(arr: &mut Vec<(i64, char)>, mut current_idx: usize) {
        while current_idx > 0 {
            let parent_idx = (current_idx - 1) / 2; // @step:sift-up
            if arr[parent_idx].0 >= arr[current_idx].0 {
                break; // @step:compare
            }
            arr.swap(parent_idx, current_idx); // @step:heap-swap
            current_idx = parent_idx; // @step:sift-up
        }
    }

    fn sift_down(arr: &mut Vec<(i64, char)>, mut parent_idx: usize) {
        loop {
            let mut largest_idx = parent_idx; // @step:sift-down
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            if left_idx < arr.len() && arr[left_idx].0 > arr[largest_idx].0 {
                // @step:compare
                largest_idx = left_idx; // @step:sift-down
            }
            if right_idx < arr.len() && arr[right_idx].0 > arr[largest_idx].0 {
                // @step:compare
                largest_idx = right_idx; // @step:sift-down
            }
            if largest_idx == parent_idx {
                break; // @step:sift-down
            }
            arr.swap(parent_idx, largest_idx); // @step:heap-swap
            parent_idx = largest_idx; // @step:sift-down
        }
    }

    // Heapify
    if heap.len() > 1 {
        for start_idx in (0..=(heap.len() / 2 - 1)).rev() {
            sift_down(&mut heap, start_idx); // @step:sift-down
        }
    }

    let mut result = String::new(); // @step:initialize
    let mut prev_entry: Option<(i64, char)> = None; // @step:initialize

    while !heap.is_empty() {
        // Extract most frequent
        let top_entry = heap[0]; // @step:heap-extract
        let last_idx = heap.len() - 1; // @step:heap-extract
        heap[0] = heap[last_idx]; // @step:heap-swap
        heap.pop(); // @step:heap-extract
        if !heap.is_empty() {
            sift_down(&mut heap, 0); // @step:sift-down
        }

        result.push(top_entry.1); // @step:heap-extract
        let new_freq = top_entry.0 - 1; // @step:heap-extract

        // Reinsert previous entry if it still has frequency
        if let Some(prev) = prev_entry {
            if prev.0 > 0 {
                heap.push(prev); // @step:heap-insert
                let last = heap.len() - 1;
                sift_up(&mut heap, last); // @step:sift-up
            }
        }

        // Hold current entry for next iteration to prevent adjacency
        prev_entry = if new_freq > 0 { Some((new_freq, top_entry.1)) } else { None }; // @step:compare

        // Impossible case: same character would be adjacent
        if heap.is_empty() && prev_entry.is_some() {
            return String::new(); // @step:complete
        }
    }

    result // @step:complete
}
