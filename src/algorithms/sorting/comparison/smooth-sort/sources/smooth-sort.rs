// Smooth Sort — Leonardo heap variant of heap sort; adaptive O(n) best case on nearly-sorted data
fn smooth_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:initialize
    }

    // Precompute Leonardo numbers up to at least array_length
    let mut leonardo_numbers: Vec<usize> = vec![1, 1];
    while *leonardo_numbers.last().unwrap() < array_length {
        let len = leonardo_numbers.len();
        let next = leonardo_numbers[len - 1] + leonardo_numbers[len - 2] + 1;
        leonardo_numbers.push(next);
    }

    // Sift element at root_index down within a Leonardo tree of given order.
    fn sift(sorted_array: &mut Vec<i64>, root_index: usize, order: usize, leonardo_numbers: &[usize]) {
        // @step:build-heap
        let mut current_root = root_index;
        let mut current_order = order;

        while current_order >= 2 {
            let right_child = current_root - 1; // @step:compare
            let left_child = current_root - 1 - leonardo_numbers[current_order - 1]; // @step:compare

            let mut largest_index = current_root;
            if sorted_array[right_child] > sorted_array[largest_index] {
                largest_index = right_child; // @step:compare
            }
            if sorted_array[left_child] > sorted_array[largest_index] {
                largest_index = left_child; // @step:compare
            }

            if largest_index == current_root {
                break; // already a valid heap
            }

            // @step:swap
            sorted_array.swap(current_root, largest_index); // @step:swap

            if largest_index == right_child {
                current_order -= 1;
            } else {
                current_order -= 2;
            }
            current_root = largest_index;
        }
    }

    // Trinkle: fix the heap root at root_index relative to all previous heap roots.
    fn trinkle(
        sorted_array: &mut Vec<i64>,
        root_index: usize,
        order: usize,
        prev_positions: &[usize],
        prev_orders: &[usize],
        leonardo_numbers: &[usize],
    ) {
        // @step:build-heap
        let mut current_root = root_index;
        let mut current_order = order;
        let mut positions = prev_positions.to_vec();
        let mut orders = prev_orders.to_vec();

        while !positions.is_empty() {
            let prev_root_index = *positions.last().unwrap();
            let prev_root_order = *orders.last().unwrap();

            if sorted_array[current_root] >= sorted_array[prev_root_index] {
                break; // @step:compare
            }

            if current_order >= 2 {
                let right_child = current_root - 1;
                let left_child = current_root - 1 - leonardo_numbers[current_order - 1];
                if sorted_array[prev_root_index] < sorted_array[right_child]
                    || sorted_array[prev_root_index] < sorted_array[left_child]
                {
                    break; // @step:compare
                }
            }

            // @step:swap
            sorted_array.swap(current_root, prev_root_index); // @step:swap

            positions.pop();
            orders.pop();
            current_root = prev_root_index;
            current_order = prev_root_order;
        }

        sift(sorted_array, current_root, current_order, leonardo_numbers);
    }

    // Build the Leonardo heap forest incrementally.
    let mut heap_positions: Vec<usize> = Vec::new();
    let mut heap_orders: Vec<usize> = Vec::new();

    for build_index in 0..array_length {
        // @step:build-heap
        let root_count = heap_orders.len();
        if root_count >= 2 && heap_orders[root_count - 1] == heap_orders[root_count - 2] + 1 {
            let new_order = heap_orders[root_count - 1] + 1;
            heap_positions.truncate(root_count - 2);
            heap_orders.truncate(root_count - 2);
            heap_positions.push(build_index);
            heap_orders.push(new_order);
        } else if root_count >= 1 && heap_orders[root_count - 1] == 1 {
            heap_positions.push(build_index);
            heap_orders.push(0);
        } else {
            heap_positions.push(build_index);
            heap_orders.push(1);
        }

        let last_index = heap_positions.len() - 1;
        let pos = heap_positions[last_index];
        let ord = heap_orders[last_index];
        let prev_pos = heap_positions[..last_index].to_vec();
        let prev_ord = heap_orders[..last_index].to_vec();
        trinkle(&mut sorted_array, pos, ord, &prev_pos, &prev_ord, &leonardo_numbers);
    }

    // Extract phase: shrink the heap forest from the right, exposing sorted elements.
    for extract_index in (0..array_length).rev() {
        // @step:extract
        let current_order = *heap_orders.last().unwrap();
        heap_positions.pop();
        heap_orders.pop();

        if current_order >= 2 {
            // Split the current tree into its two sub-trees and re-heapify them
            let right_root = extract_index - 1;
            let left_root = extract_index - 1 - leonardo_numbers[current_order - 1];
            heap_positions.push(left_root);
            heap_orders.push(current_order - 2);
            heap_positions.push(right_root);
            heap_orders.push(current_order - 1);

            let last_index = heap_positions.len() - 1;
            let prev_left_pos = heap_positions[..last_index - 1].to_vec();
            let prev_left_ord = heap_orders[..last_index - 1].to_vec();
            trinkle(&mut sorted_array, left_root, current_order - 2, &prev_left_pos, &prev_left_ord, &leonardo_numbers);
            let prev_right_pos = heap_positions[..last_index].to_vec();
            let prev_right_ord = heap_orders[..last_index].to_vec();
            trinkle(&mut sorted_array, right_root, current_order - 1, &prev_right_pos, &prev_right_ord, &leonardo_numbers);
        }

        // @step:mark-sorted
    }

    sorted_array // @step:complete
}
