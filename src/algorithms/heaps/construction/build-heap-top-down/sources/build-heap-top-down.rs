// Build Heap Top-Down — build a min-heap by inserting elements one-by-one with sift-up
fn build_heap_top_down(input_array: &[i64]) -> Vec<i64> {
    let mut heap: Vec<i64> = Vec::new(); // @step:initialize
    // Insert each element at the end and restore heap property by sifting up
    for &value in input_array {
        heap.push(value); // @step:heap-insert
        let last = heap.len() - 1;
        sift_up(&mut heap, last); // @step:sift-up
    }
    heap // @step:complete
}

fn sift_up(heap: &mut Vec<i64>, mut child_idx: usize) {
    while child_idx > 0 {
        let parent_idx = (child_idx - 1) / 2; // @step:sift-up
        // If child is smaller than parent, swap to restore min-heap property
        if heap[child_idx] < heap[parent_idx] {
            // @step:sift-up
            heap.swap(child_idx, parent_idx); // @step:heap-swap
            child_idx = parent_idx; // @step:sift-up
        } else {
            break; // @step:sift-up
        }
    }
}
