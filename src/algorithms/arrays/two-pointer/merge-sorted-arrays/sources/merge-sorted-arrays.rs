// Merge Two Sorted Arrays — O(n+m) merge using two pointers
fn merge_sorted_arrays(first_array: &[i32], second_array: &[i32]) -> Vec<i32> {
    let mut merged: Vec<i32> = Vec::new(); // @step:initialize
    let mut first_pointer = 0usize; // @step:initialize
    let mut second_pointer = 0usize; // @step:initialize

    // Compare front elements from each array, place the smaller into result
    while first_pointer < first_array.len() && second_pointer < second_array.len() {
        if first_array[first_pointer] <= second_array[second_pointer] {
            // @step:compare
            merged.push(first_array[first_pointer]); // @step:visit
            first_pointer += 1; // @step:visit
        } else {
            merged.push(second_array[second_pointer]); // @step:visit
            second_pointer += 1; // @step:visit
        }
    }

    // Drain remaining elements from whichever array has leftovers
    while first_pointer < first_array.len() {
        merged.push(first_array[first_pointer]); // @step:visit
        first_pointer += 1; // @step:visit
    }
    while second_pointer < second_array.len() {
        merged.push(second_array[second_pointer]); // @step:visit
        second_pointer += 1; // @step:visit
    }

    merged // @step:complete
}
