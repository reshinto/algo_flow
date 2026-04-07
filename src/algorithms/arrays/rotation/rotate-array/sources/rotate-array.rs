// Rotate Array (Reversal Method) — O(n) three-reversal technique with O(1) space
fn rotate_array(input_array: &[i32], rotate_count: usize) -> Vec<i32> {
    let mut result = input_array.to_vec();
    let array_length = result.len();

    if array_length == 0 {
        return result; // @step:initialize
    }

    let effective_rotation = rotate_count % array_length; // @step:initialize

    if effective_rotation == 0 {
        return result; // @step:initialize
    }

    // Phase 1: reverse entire array
    let mut left_pointer = 0usize; // @step:initialize
    let mut right_pointer = array_length - 1; // @step:initialize

    while left_pointer < right_pointer {
        result.swap(left_pointer, right_pointer); // @step:swap
        left_pointer += 1; // @step:visit
        right_pointer -= 1; // @step:visit
    }

    // Phase 2: reverse first effective_rotation elements
    left_pointer = 0; // @step:initialize
    right_pointer = effective_rotation - 1; // @step:initialize

    while left_pointer < right_pointer {
        result.swap(left_pointer, right_pointer); // @step:swap
        left_pointer += 1; // @step:visit
        right_pointer -= 1; // @step:visit
    }

    // Phase 3: reverse remaining elements
    left_pointer = effective_rotation; // @step:initialize
    right_pointer = array_length - 1; // @step:initialize

    while left_pointer < right_pointer {
        result.swap(left_pointer, right_pointer); // @step:swap
        left_pointer += 1; // @step:visit
        right_pointer -= 1; // @step:visit
    }

    result // @step:complete
}
