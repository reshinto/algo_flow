// Gnome Sort — move forward if in order, backward (swapping) if not
fn gnome_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    let mut position = 0usize; // @step:initialize

    while position < array_length {
        if position == 0 {
            // @step:move-forward
            position += 1; // @step:move-forward
        } else {
            // @step:compare
            if sorted_array[position] >= sorted_array[position - 1] {
                // Elements are in order — move forward
                // @step:move-forward
                position += 1; // @step:move-forward
            } else {
                // Elements are out of order — swap and step back
                // @step:swap
                sorted_array.swap(position, position - 1); // @step:swap
                position -= 1; // @step:swap
            }
        }
    }

    // All elements are in their sorted positions
    // @step:mark-sorted

    sorted_array // @step:complete
}
