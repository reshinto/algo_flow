// Floyd's Cycle Detection — tortoise and hare: treat array as linked structure, detect cycle and find entrance
fn floyd_cycle_detection(input_array: &[usize]) -> (bool, i64) {
    if input_array.is_empty() {
        // @step:initialize
        return (false, -1); // @step:initialize
    }

    let mut tortoise = 0usize; // @step:initialize
    let mut hare = 0usize; // @step:initialize

    // Phase 1: detect meeting point inside the cycle
    let mut iteration_count = 0;
    let max_iterations = input_array.len() * 2;
    loop {
        if tortoise >= input_array.len() || hare >= input_array.len() {
            break;
        }
        tortoise = input_array[tortoise]; // @step:visit
        let hare_next = input_array[hare];
        if hare_next >= input_array.len() {
            break;
        }
        hare = input_array[hare_next]; // @step:visit
        iteration_count += 1;
        if iteration_count > max_iterations {
            break;
        }
        if tortoise == hare { break; } // @step:compare
    }

    // Phase 2: find cycle entrance — reset tortoise to start, hare stays at meeting point
    tortoise = 0; // @step:visit
    while tortoise != hare { // @step:compare
        tortoise = input_array[tortoise]; // @step:visit
        hare = input_array[hare]; // @step:visit
    }

    (true, tortoise as i64) // @step:complete
}
