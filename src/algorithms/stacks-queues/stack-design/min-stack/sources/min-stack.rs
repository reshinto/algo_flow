// Min Stack — maintain a main stack paired with an auxiliary min-tracking stack for O(1) getMin
fn min_stack(values: &[i32]) -> i32 {
    let mut main_stack: Vec<i32> = Vec::new(); // @step:initialize
    let mut min_tracker: Vec<i32> = Vec::new(); // @step:initialize

    for element_idx in 0..values.len() {
        let current_value = values[element_idx]; // @step:visit

        main_stack.push(current_value); // @step:push

        // Maintain auxiliary min stack: duplicate current min if new value is not smaller
        if min_tracker.is_empty() || current_value <= *min_tracker.last().unwrap() { // @step:compare
            min_tracker.push(current_value); // @step:push-auxiliary
        } else {
            min_tracker.push(*min_tracker.last().unwrap()); // @step:push-auxiliary
        }
    }

    // The top of min_tracker always holds the current minimum
    *min_tracker.last().unwrap_or(&0) // @step:peek,complete
}

fn main() {
    println!("{}", min_stack(&[-2, 0, -3]));
}
