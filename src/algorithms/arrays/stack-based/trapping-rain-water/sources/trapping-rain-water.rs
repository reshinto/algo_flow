// Trapping Rain Water — O(n) two-pointer approach
fn trapping_rain_water(heights: &[i32]) -> (i32, Vec<i32>) {
    let array_length = heights.len();
    if array_length == 0 {
        // @step:initialize
        return (0, vec![]); // @step:initialize
    }

    let mut left_pointer = 0usize; // @step:initialize
    let mut right_pointer = array_length - 1; // @step:initialize
    let mut max_left = 0i32; // @step:initialize
    let mut max_right = 0i32; // @step:initialize
    let mut total_water = 0i32; // @step:initialize
    let mut water_per_index = vec![0i32; array_length]; // @step:initialize

    while left_pointer < right_pointer {
        if heights[left_pointer] <= heights[right_pointer] {
            // @step:compare
            if heights[left_pointer] >= max_left {
                // @step:compare
                max_left = heights[left_pointer]; // @step:visit
            } else {
                water_per_index[left_pointer] = max_left - heights[left_pointer]; // @step:visit
                total_water += water_per_index[left_pointer]; // @step:visit
            }
            left_pointer += 1; // @step:visit
        } else {
            if heights[right_pointer] >= max_right {
                // @step:compare
                max_right = heights[right_pointer]; // @step:visit
            } else {
                water_per_index[right_pointer] = max_right - heights[right_pointer]; // @step:visit
                total_water += water_per_index[right_pointer]; // @step:visit
            }
            right_pointer -= 1; // @step:visit
        }
    }

    (total_water, water_per_index) // @step:complete
}
