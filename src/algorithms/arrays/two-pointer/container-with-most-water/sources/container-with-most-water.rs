// Container With Most Water — two pointers converge inward, always moving the shorter bar to maximize area
fn container_with_most_water(heights: &[i32]) -> (i32, usize, usize) {
    if heights.is_empty() { return (0, 0, 0); } // @step:initialize
    let mut left_pointer = 0usize; // @step:initialize
    let mut right_pointer = heights.len() - 1; // @step:initialize
    let mut max_area = 0i32; // @step:initialize
    let mut best_left = 0usize; // @step:initialize
    let mut best_right = heights.len() - 1; // @step:initialize

    while left_pointer < right_pointer {
        let left_height = heights[left_pointer]; // @step:visit
        let right_height = heights[right_pointer]; // @step:visit
        let current_area = left_height.min(right_height) * (right_pointer - left_pointer) as i32; // @step:compare

        if current_area > max_area {
            // @step:compare
            max_area = current_area; // @step:compare
            best_left = left_pointer; // @step:compare
            best_right = right_pointer; // @step:compare
        }

        if left_height <= right_height {
            // @step:compare
            left_pointer += 1; // @step:visit
        } else {
            right_pointer -= 1; // @step:visit
        }
    }

    (max_area, best_left, best_right) // @step:complete
}
