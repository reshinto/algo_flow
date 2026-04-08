// Stalin Sort — eliminate any element smaller than the current maximum; returns only surviving elements
fn stalin_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let original_array = input_array.to_vec(); // @step:initialize
    let array_length = original_array.len(); // @step:initialize

    if array_length == 0 {
        return vec![]; // @step:complete
    }

    let mut surviving_elements: Vec<i64> = vec![original_array[0]]; // @step:initialize — first element always survives
    let mut current_maximum = original_array[0]; // @step:initialize

    for scan_index in 1..array_length {
        let candidate_value = original_array[scan_index];

        // @step:compare
        if candidate_value >= current_maximum {
            // Element is in order — keep it
            current_maximum = candidate_value; // @step:compare
            surviving_elements.push(candidate_value); // @step:compare — keep
        }
        // Otherwise the element is eliminated (out of order)
        // @step:compare — eliminate
    }

    surviving_elements // @step:complete
}
