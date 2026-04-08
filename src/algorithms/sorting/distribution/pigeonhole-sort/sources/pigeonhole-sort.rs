// Pigeonhole Sort — place each element in its own hole, then collect in order
fn pigeonhole_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    if input_array.is_empty() {
        return vec![]; // @step:initialize
    }
    let mut working_array = input_array.to_vec(); // @step:initialize
    let array_length = working_array.len(); // @step:initialize

    let min_value = *working_array.iter().min().unwrap(); // @step:initialize
    let max_value = *working_array.iter().max().unwrap(); // @step:initialize
    let hole_count = (max_value - min_value + 1) as usize; // @step:initialize

    // Create one pigeonhole per distinct value in range
    let mut holes: Vec<i64> = vec![0; hole_count]; // @step:initialize

    // Place each element into its corresponding pigeonhole
    for place_index in 0..array_length {
        // @step:place,compare
        let hole_position = (working_array[place_index] - min_value) as usize; // @step:place,compare
        holes[hole_position] += 1; // @step:place
    }

    // Collect elements back from pigeonholes in ascending order
    let mut write_index = 0usize; // @step:collect
    for hole_index in 0..hole_count {
        // @step:collect
        while holes[hole_index] > 0 {
            // @step:collect
            working_array[write_index] = hole_index as i64 + min_value; // @step:collect
            write_index += 1; // @step:collect
            holes[hole_index] -= 1; // @step:collect
        }
    }

    // @step:mark-sorted
    working_array // @step:complete
}
