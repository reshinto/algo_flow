// Bitonic Sort Network — fixed compare-swap network for power-of-2 sizes
fn bitonic_sort_network(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let original_length = sorted_array.len(); // @step:initialize

    // Pad to next power of 2 with large sentinel values
    let mut padded_length = 1usize; // @step:initialize
    while padded_length < original_length {
        // @step:initialize
        padded_length *= 2; // @step:initialize
    }
    while sorted_array.len() < padded_length {
        // @step:initialize
        sorted_array.push(i64::MAX); // @step:initialize
    }

    // Bitonic sort network: log2(n) stages, each with sub-stages of compare-swap pairs
    let mut stage_size = 2usize;
    while stage_size <= padded_length {
        // @step:compare
        let mut sub_size = stage_size;
        while sub_size >= 2 {
            // @step:compare
            let half_sub_size = sub_size / 2; // @step:compare
            for element_index in 0..padded_length {
                // @step:compare
                let partner_index = element_index ^ half_sub_size; // @step:compare
                if partner_index > element_index {
                    // @step:compare
                    let ascending = (element_index & stage_size) == 0; // @step:compare
                    if (ascending && sorted_array[element_index] > sorted_array[partner_index])
                        || (!ascending && sorted_array[element_index] < sorted_array[partner_index])
                    {
                        // @step:swap
                        sorted_array.swap(element_index, partner_index); // @step:swap
                    }
                }
            }
            sub_size /= 2;
        }
        stage_size *= 2;
    }

    // Remove padding sentinels
    // @step:mark-sorted
    sorted_array.truncate(original_length);
    let result = sorted_array; // @step:mark-sorted

    result // @step:complete
}
