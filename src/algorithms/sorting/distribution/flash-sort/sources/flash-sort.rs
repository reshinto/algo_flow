// Flash Sort — classify elements into buckets by value range, permute in-place, then insertion sort
fn flash_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:complete
    }

    // Find min and max to determine the value range
    let mut min_value = sorted_array[0]; // @step:initialize
    let mut max_index = 0usize; // @step:initialize
    for scan_index in 1..array_length {
        if sorted_array[scan_index] < min_value {
            min_value = sorted_array[scan_index]; // @step:initialize
        }
        if sorted_array[scan_index] > sorted_array[max_index] {
            max_index = scan_index; // @step:initialize
        }
    }

    if sorted_array[max_index] == min_value {
        return sorted_array; // @step:complete
    }

    // Number of classes — roughly n/5 or 1, bounded
    let class_count = ((0.45 * array_length as f64) as usize).max(1); // @step:initialize
    let mut class_vector = vec![0i64; class_count]; // @step:initialize
    let scale_factor = (class_count - 1) as f64 / (sorted_array[max_index] - min_value) as f64; // @step:initialize

    // Classify — count how many elements fall in each class
    for classify_index in 0..array_length {
        // @step:classify
        let class_index = (scale_factor * (sorted_array[classify_index] - min_value) as f64) as usize; // @step:classify
        class_vector[class_index] += 1; // @step:classify
    }

    // Compute prefix sums (class upper boundaries)
    for prefix_index in 1..class_count {
        // @step:classify
        class_vector[prefix_index] += class_vector[prefix_index - 1]; // @step:classify
    }

    // Swap the maximum element to the front temporarily
    sorted_array.swap(0, max_index); // @step:swap

    // Permutation phase — cycle sort within classes
    let mut cycle_index = 0usize; // @step:swap
    let mut permutations_done = 0usize; // @step:swap

    while permutations_done < array_length - 1 {
        // @step:swap
        let current_class = (scale_factor * (sorted_array[cycle_index] - min_value) as f64) as usize;
        while cycle_index >= class_vector[current_class.min(class_count - 1)] as usize {
            // @step:compare
            cycle_index += 1; // @step:compare
        }
        let mut hold_value = sorted_array[cycle_index]; // @step:swap
        let mut target_class = (scale_factor * (hold_value - min_value) as f64) as usize; // @step:swap

        while cycle_index != class_vector[target_class] as usize - 1 {
            // @step:swap
            target_class = (scale_factor * (hold_value - min_value) as f64) as usize; // @step:swap
            let target_position = class_vector[target_class] as usize - 1; // @step:swap
            let flash_temp = sorted_array[target_position]; // @step:swap
            sorted_array[target_position] = hold_value; // @step:swap
            hold_value = flash_temp; // @step:swap
            class_vector[target_class] -= 1; // @step:swap
            permutations_done += 1; // @step:swap
        }
        // Place the final held value at cycle_index to complete this cycle
        sorted_array[cycle_index] = hold_value; // @step:swap
        permutations_done += 1; // @step:swap
    }

    // Insertion sort pass to clean up small disorder within classes
    for outer_index in 1..array_length {
        // @step:insertion-pass
        let current_value = sorted_array[outer_index]; // @step:insertion-pass
        let mut insert_position = outer_index as isize - 1; // @step:insertion-pass

        while insert_position >= 0 && sorted_array[insert_position as usize] > current_value {
            // @step:compare
            sorted_array[(insert_position + 1) as usize] = sorted_array[insert_position as usize]; // @step:swap
            insert_position -= 1; // @step:swap
        }
        sorted_array[(insert_position + 1) as usize] = current_value; // @step:mark-sorted
    }

    sorted_array // @step:complete
}
