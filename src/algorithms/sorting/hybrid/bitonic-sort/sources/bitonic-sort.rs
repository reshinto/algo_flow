// Bitonic Sort — build a bitonic sequence then merge to sort; works best on power-of-2 sizes
fn bitonic_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let array_length = input_array.len(); // @step:initialize
    if array_length <= 1 {
        return input_array.to_vec(); // @step:initialize
    }

    // Pad to the next power of 2 with i64::MAX so real elements always sort first
    let mut padded_length = 1usize; // @step:initialize
    while padded_length < array_length {
        padded_length <<= 1; // @step:initialize
    }
    let mut sorted_array: Vec<i64> = input_array.to_vec(); // @step:initialize
    while sorted_array.len() < padded_length {
        sorted_array.push(i64::MAX); // @step:initialize
    }

    // Bitonic sort network: outer stage controls the sub-sequence size
    let mut stage = 2usize;
    while stage <= padded_length {
        // Each stage doubles the size of sorted bitonic sequences
        let mut step = stage >> 1;
        while step > 0 {
            // @step:compare
            for element_index in 0..padded_length {
                let partner_index = element_index ^ step; // @step:compare

                if partner_index > element_index {
                    // @step:compare
                    let is_ascending = (element_index & stage) == 0; // @step:compare

                    if is_ascending && sorted_array[element_index] > sorted_array[partner_index] {
                        // @step:swap
                        sorted_array.swap(element_index, partner_index); // @step:swap
                    } else if !is_ascending && sorted_array[element_index] < sorted_array[partner_index] {
                        // @step:swap
                        sorted_array.swap(element_index, partner_index); // @step:swap
                    }
                }
            }
            step >>= 1;
        }
        stage <<= 1;
    }

    // @step:mark-sorted
    sorted_array.truncate(array_length);
    sorted_array // @step:complete
}
