// Merge Insertion Sort (Ford-Johnson) — theoretically optimal comparisons; pair elements, sort larger half recursively, binary-insert smaller half
fn merge_insertion_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:initialize
    }

    // Perform a binary search to find the insertion position in a sorted subarray
    fn binary_search_insertion_point(
        target_value: i64,
        search_array: &[i64],
        left_bound: usize,
        right_bound: usize,
    ) -> usize {
        // @step:binary-insert
        let mut low = left_bound;
        let mut high = right_bound;

        while low < high {
            let mid_point = (low + high) / 2; // @step:binary-insert
            if search_array[mid_point] < target_value {
                // @step:binary-insert
                low = mid_point + 1;
            } else {
                high = mid_point;
            }
        }
        low // @step:binary-insert
    }

    // Insert target_value into sorted_array at the correct position (shifting elements right)
    fn insert_at(sorted_array: &mut Vec<i64>, target_value: i64, insertion_index: usize, end_index: usize) {
        // @step:binary-insert
        for shift_index in (insertion_index..end_index).rev() {
            sorted_array[shift_index + 1] = sorted_array[shift_index]; // @step:swap
        }
        sorted_array[insertion_index] = target_value; // @step:binary-insert
    }

    // Step 1: Pair elements and compare each pair to identify larger and smaller elements
    let pair_count = array_length / 2;
    let has_unpaired = array_length % 2 == 1;

    // Sort within each pair so sorted_array[2k] >= sorted_array[2k+1]
    for pair_index in 0..pair_count {
        // @step:pair
        let left_pos = pair_index * 2; // @step:compare
        let right_pos = left_pos + 1; // @step:compare

        if sorted_array[left_pos] < sorted_array[right_pos] {
            // @step:compare
            sorted_array.swap(left_pos, right_pos); // @step:swap
        }
    }

    // Step 2: Extract the larger elements (at even indices) and sort them recursively
    let mut larger_elements: Vec<i64> = Vec::new();
    let mut smaller_elements: Vec<i64> = Vec::new();

    for pair_index in 0..pair_count {
        larger_elements.push(sorted_array[pair_index * 2]); // @step:pair
        smaller_elements.push(sorted_array[pair_index * 2 + 1]); // @step:pair
    }
    if has_unpaired {
        smaller_elements.push(sorted_array[array_length - 1]); // @step:pair
    }

    // Recursively sort the larger elements using insertion sort
    for insert_index in 1..larger_elements.len() {
        let current_value = larger_elements[insert_index]; // @step:compare
        let mut inner_index = insert_index as isize - 1;

        while inner_index >= 0 && larger_elements[inner_index as usize] > current_value {
            // @step:compare
            larger_elements[(inner_index + 1) as usize] = larger_elements[inner_index as usize]; // @step:swap
            inner_index -= 1;
        }
        larger_elements[(inner_index + 1) as usize] = current_value; // @step:binary-insert
    }

    // Step 3: Build the initial sorted sequence from larger elements
    let result_length = larger_elements.len();
    for result_index in 0..result_length {
        sorted_array[result_index] = larger_elements[result_index]; // @step:binary-insert
    }

    let mut inserted_count = result_length;

    // Insert the smaller elements using binary insertion
    for smaller_index in 0..smaller_elements.len() {
        let value_to_insert = smaller_elements[smaller_index]; // @step:binary-insert
        let search_bound = inserted_count; // @step:binary-insert

        let insertion_position = binary_search_insertion_point(
            value_to_insert,
            &sorted_array[..search_bound],
            0,
            search_bound,
        ); // @step:compare

        insert_at(&mut sorted_array, value_to_insert, insertion_position, inserted_count); // @step:binary-insert
        inserted_count += 1;
    }

    // @step:mark-sorted

    sorted_array // @step:complete
}
