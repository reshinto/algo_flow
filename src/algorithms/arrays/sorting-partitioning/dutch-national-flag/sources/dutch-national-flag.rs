// Dutch National Flag — O(n) 3-way partition using three pointers (low, mid, high)
fn dutch_national_flag(input_array: &[i32]) -> Vec<i32> {
    let mut result = input_array.to_vec();
    let mut low_pointer = 0usize; // @step:initialize
    let mut mid_pointer = 0usize; // @step:initialize
    let mut high_pointer = if result.is_empty() { 0 } else { result.len() - 1 }; // @step:initialize

    while mid_pointer <= high_pointer && !result.is_empty() {
        let current_value = result[mid_pointer]; // @step:compare

        if current_value == 0 {
            // @step:compare
            result.swap(low_pointer, mid_pointer); // @step:swap
            low_pointer += 1; // @step:visit
            mid_pointer += 1; // @step:visit
        } else if current_value == 1 {
            // @step:compare
            mid_pointer += 1; // @step:visit
        } else {
            result.swap(mid_pointer, high_pointer); // @step:swap
            if high_pointer == 0 { break; }
            high_pointer -= 1; // @step:visit
        }
    }

    result // @step:complete
}
