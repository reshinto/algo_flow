// Cyclic Sort — O(n) sort for arrays containing values 1..n by placing each at index value-1
fn cyclic_sort(input_array: &[i32]) -> Vec<i32> {
    let mut result = input_array.to_vec(); // @step:initialize
    let mut current_index = 0usize; // @step:initialize

    while current_index < result.len() {
        let current_value = result[current_index]; // @step:compare
        let correct_index = (current_value - 1) as usize; // @step:compare

        if correct_index < result.len()
            && correct_index != current_index
            && result[correct_index] != current_value
        {
            // @step:compare
            result.swap(current_index, correct_index); // @step:swap
        } else {
            current_index += 1; // @step:visit
        }
    }

    result // @step:complete
}
