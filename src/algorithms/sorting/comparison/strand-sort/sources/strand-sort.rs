// Strand Sort — repeatedly extract sorted sublists (strands) from input and merge into output
fn merge_two_sorted_arrays(left_array: &[i64], right_array: &[i64]) -> Vec<i64> {
    let mut merged: Vec<i64> = Vec::new();
    let mut left_pointer = 0usize;
    let mut right_pointer = 0usize;

    while left_pointer < left_array.len() && right_pointer < right_array.len() {
        if left_array[left_pointer] <= right_array[right_pointer] {
            merged.push(left_array[left_pointer]);
            left_pointer += 1;
        } else {
            merged.push(right_array[right_pointer]);
            right_pointer += 1;
        }
    }

    while left_pointer < left_array.len() {
        merged.push(left_array[left_pointer]);
        left_pointer += 1;
    }

    while right_pointer < right_array.len() {
        merged.push(right_array[right_pointer]);
        right_pointer += 1;
    }

    merged
}

fn strand_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut remaining_array = input_array.to_vec(); // @step:initialize
    let array_length = remaining_array.len(); // @step:initialize

    if array_length <= 1 {
        return remaining_array.clone(); // @step:initialize
    }

    let mut output_array: Vec<i64> = Vec::new(); // @step:initialize

    while !remaining_array.is_empty() {
        // Extract a strand: pick elements forming an ascending sequence
        let mut strand: Vec<i64> = vec![remaining_array[0]]; // @step:extract-strand
        let mut leftover: Vec<i64> = Vec::new(); // @step:extract-strand

        for scan_index in 1..remaining_array.len() {
            // @step:compare
            if remaining_array[scan_index] >= *strand.last().unwrap() {
                // @step:compare
                strand.push(remaining_array[scan_index]); // @step:extract-strand
            } else {
                leftover.push(remaining_array[scan_index]); // @step:extract-strand
            }
        }

        // Merge the extracted strand into the output array
        output_array = merge_two_sorted_arrays(&output_array, &strand); // @step:merge-strand

        // Update remaining to only contain elements not in strand
        remaining_array = leftover; // @step:extract-strand
    }

    // Copy the sorted output back
    for _final_index in 0..output_array.len() {
        // @step:mark-sorted
    }

    output_array // @step:complete
}
