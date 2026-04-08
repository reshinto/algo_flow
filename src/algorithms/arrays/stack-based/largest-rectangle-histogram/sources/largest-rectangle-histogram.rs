// Largest Rectangle in Histogram — O(n) monotonic stack approach
fn largest_rectangle_histogram(heights: &[i32]) -> (i64, i64, i64, i64) {
    let array_length = heights.len();
    if array_length == 0 {
        // @step:initialize
        return (0, -1, -1, 0); // @step:initialize
    }

    let mut index_stack: Vec<usize> = Vec::new(); // @step:initialize
    let mut max_area = 0i64; // @step:initialize
    let mut best_left = 0usize; // @step:initialize
    let mut best_right = 0usize; // @step:initialize
    let mut best_height = 0i32; // @step:initialize

    for current_index in 0..=array_length {
        let current_height = if current_index == array_length { 0 } else { heights[current_index] }; // @step:compare

        while !index_stack.is_empty() && current_height < heights[*index_stack.last().unwrap()] {
            // @step:compare
            let popped_index = index_stack.pop().unwrap(); // @step:visit
            let popped_height = heights[popped_index]; // @step:visit
            let left_boundary = if index_stack.is_empty() { 0 } else { index_stack.last().unwrap() + 1 }; // @step:visit
            let width = current_index - left_boundary; // @step:visit
            let area = popped_height as i64 * width as i64; // @step:visit

            if area > max_area {
                // @step:compare
                max_area = area; // @step:visit
                best_left = left_boundary; // @step:visit
                best_right = current_index - 1; // @step:visit
                best_height = popped_height; // @step:visit
            }
        }

        index_stack.push(current_index); // @step:visit
    }

    (max_area, best_left as i64, best_right as i64, best_height as i64) // @step:complete
}
