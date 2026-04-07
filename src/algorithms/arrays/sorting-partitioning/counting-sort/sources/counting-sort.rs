// Counting Sort — O(n+k) sort by counting frequencies and reconstructing sorted order
fn counting_sort(input_array: &[usize]) -> Vec<usize> {
    if input_array.is_empty() {
        // @step:initialize
        return vec![]; // @step:initialize
    }

    let max_value = *input_array.iter().max().unwrap(); // @step:initialize
    let mut count_array = vec![0usize; max_value + 1]; // @step:initialize

    // Count the frequency of each element
    for scan_index in 0..input_array.len() {
        count_array[input_array[scan_index]] += 1; // @step:visit
    }

    // Reconstruct the sorted array from count frequencies
    let mut sorted_array: Vec<usize> = Vec::new(); // @step:compare
    for current_value in 0..=max_value {
        for _ in 0..count_array[current_value] {
            sorted_array.push(current_value); // @step:compare
        }
    }

    sorted_array // @step:complete
}
