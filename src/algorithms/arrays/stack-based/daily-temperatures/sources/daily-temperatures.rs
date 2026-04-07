// Daily Temperatures — monotonic stack: for each day, find how many days until a warmer temperature (0 if none)
fn daily_temperatures(temperatures: &[i32]) -> Vec<i32> {
    let array_length = temperatures.len();
    let mut wait_days = vec![0i32; array_length]; // @step:initialize
    let mut pending_stack: Vec<usize> = Vec::new(); // @step:initialize

    for day_index in 0..array_length {
        let today_temp = temperatures[day_index]; // @step:visit

        while !pending_stack.is_empty() {
            let stack_top = *pending_stack.last().unwrap(); // @step:compare
            if temperatures[stack_top] < today_temp {
                // @step:compare
                let popped_index = pending_stack.pop().unwrap(); // @step:compare
                wait_days[popped_index] = (day_index - popped_index) as i32; // @step:compare
            } else {
                break;
            }
        }

        pending_stack.push(day_index); // @step:visit
    }

    wait_days // @step:complete
}
