// Remove Duplicates from Sorted Array — O(n) two-pointer: write pointer tracks unique boundary
fn remove_duplicates(sorted_array: &[i32]) -> (usize, Vec<i32>) {
    if sorted_array.is_empty() {
        // @step:initialize
        return (0, vec![]); // @step:initialize
    }

    let mut result = sorted_array.to_vec();
    let mut write_pointer = 0usize; // @step:initialize

    for read_pointer in 1..result.len() {
        if result[read_pointer] != result[write_pointer] {
            // @step:compare
            write_pointer += 1; // @step:swap
            result[write_pointer] = result[read_pointer]; // @step:swap
        }
    }

    let unique_count = write_pointer + 1;
    (unique_count, result[..unique_count].to_vec()) // @step:complete
}
