// Move Zeros to End — O(n) two-pointer: write pointer tracks next write position, read pointer scans
fn move_zeros(input_array: &[i32]) -> Vec<i32> {
    let mut result = input_array.to_vec();
    let mut write_pointer = 0usize; // @step:initialize

    for read_pointer in 0..result.len() {
        let current_element = result[read_pointer]; // @step:compare
        if current_element != 0 {
            // @step:compare
            result.swap(write_pointer, read_pointer); // @step:swap
            write_pointer += 1; // @step:visit
        }
    }

    result // @step:complete
}
