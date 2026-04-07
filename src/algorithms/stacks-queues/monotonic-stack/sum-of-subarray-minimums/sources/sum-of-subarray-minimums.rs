// Sum of Subarray Minimums — for each element, compute its contribution as minimum across subarrays using monotonic stack
fn sum_of_subarray_minimums(arr: &[i64]) -> i64 {
    const MOD: i64 = 1_000_000_007; // @step:initialize
    let array_length = arr.len(); // @step:initialize
    let mut left_distances: Vec<i64> = vec![0; array_length]; // @step:initialize
    let mut right_distances: Vec<i64> = vec![0; array_length]; // @step:initialize
    let mut index_stack: Vec<usize> = Vec::new(); // @step:initialize

    // Compute left distances: distance to previous less element
    for element_idx in 0..array_length {
        let current_value = arr[element_idx]; // @step:visit
        // Pop while stack top has value >= current (not strictly less)
        while let Some(&top_idx) = index_stack.last() {
            if arr[top_idx] >= current_value { // @step:compare
                index_stack.pop(); // @step:maintain-monotonic
            } else {
                break;
            }
        }
        left_distances[element_idx] = if index_stack.is_empty() {
            element_idx as i64 + 1
        } else {
            element_idx as i64 - *index_stack.last().unwrap() as i64
        }; // @step:resolve
        index_stack.push(element_idx); // @step:push
    }

    index_stack.clear(); // @step:initialize

    // Compute right distances: distance to next less-or-equal element
    for element_idx in (0..array_length).rev() {
        let current_value = arr[element_idx]; // @step:visit
        // Pop while stack top has value > current (strictly greater — allows equal on right)
        while let Some(&top_idx) = index_stack.last() {
            if arr[top_idx] > current_value { // @step:compare
                index_stack.pop(); // @step:maintain-monotonic
            } else {
                break;
            }
        }
        right_distances[element_idx] = if index_stack.is_empty() {
            array_length as i64 - element_idx as i64
        } else {
            *index_stack.last().unwrap() as i64 - element_idx as i64
        }; // @step:resolve
        index_stack.push(element_idx); // @step:push
    }

    // Sum contributions: each element contributes arr[i] * left[i] * right[i]
    let mut result: i64 = 0; // @step:initialize
    for element_idx in 0..array_length {
        result = (result + arr[element_idx] * left_distances[element_idx] * right_distances[element_idx]) % MOD; // @step:resolve
    }

    result // @step:complete
}

fn main() {
    let arr = vec![3i64, 1, 2, 4];
    println!("{}", sum_of_subarray_minimums(&arr));
}
