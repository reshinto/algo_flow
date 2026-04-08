// Kth Smallest Element — find the kth smallest element using a max-heap of size k
fn kth_smallest_element(array: &[i64], k_value: usize) -> i64 {
    let mut max_heap: Vec<i64> = Vec::new(); // @step:initialize

    fn sift_up(heap: &mut Vec<i64>, mut idx: usize) {
        while idx > 0 {
            let parent_idx = (idx - 1) / 2; // @step:sift-up
            if heap[parent_idx] >= heap[idx] {
                break; // @step:compare
            }
            heap.swap(parent_idx, idx); // @step:heap-swap
            idx = parent_idx; // @step:sift-up
        }
    }

    fn sift_down(heap: &mut Vec<i64>, mut parent_idx: usize, size: usize) {
        loop {
            let mut largest_idx = parent_idx; // @step:sift-down
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            if left_idx < size && heap[left_idx] > heap[largest_idx] {
                // @step:compare
                largest_idx = left_idx; // @step:sift-down
            }
            if right_idx < size && heap[right_idx] > heap[largest_idx] {
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

    for &element in array {
        if max_heap.len() < k_value {
            max_heap.push(element); // @step:heap-insert
            let last = max_heap.len() - 1;
            sift_up(&mut max_heap, last); // @step:sift-up
        } else if element < max_heap[0] {
            // @step:compare
            max_heap[0] = element; // @step:heap-extract
            let size = max_heap.len();
            sift_down(&mut max_heap, 0, size); // @step:sift-down
        }
    }

    max_heap[0] // @step:complete
}
