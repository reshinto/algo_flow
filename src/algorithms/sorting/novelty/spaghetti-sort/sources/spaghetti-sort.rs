// Spaghetti Sort — find and remove tallest strand repeatedly (analogous to physical spaghetti rods)
fn spaghetti_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let original_array = input_array.to_vec(); // @step:initialize
    let array_length = original_array.len(); // @step:initialize

    // Simulate "holding up spaghetti bundles": work with a copy
    let mut remaining_strands = original_array.clone(); // @step:initialize
    let mut sorted_result: Vec<i64> = Vec::new(); // @step:initialize

    // Repeatedly find and remove the tallest strand (maximum element)
    for _extraction_pass in 0..array_length {
        // @step:find-tallest
        let mut tallest_index = 0usize; // @step:find-tallest
        let mut tallest_value = remaining_strands[0]; // @step:find-tallest

        // Scan all remaining strands to find the tallest
        for scan_index in 1..remaining_strands.len() {
            // @step:compare
            if remaining_strands[scan_index] > tallest_value {
                // @step:compare
                tallest_index = scan_index; // @step:compare
                tallest_value = remaining_strands[scan_index]; // @step:compare
            }
        }

        // Remove the tallest strand and place it at the front of the sorted result
        remaining_strands.remove(tallest_index); // @step:swap
        sorted_result.insert(0, tallest_value); // @step:swap — prepend max to build result in ascending order

        // @step:mark-sorted
    }

    sorted_result // @step:complete
}
