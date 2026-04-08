// Sleep Sort — simulated: each element's "delay" is its value, smaller values wake up first
fn sleep_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let original_array = input_array.to_vec(); // @step:initialize
    let array_length = original_array.len(); // @step:initialize

    // Simulate scheduling: sort elements by value (ascending delay order)
    // In real sleep sort, each element schedules itself with a timer based on its value
    // and outputs when its timer fires; smaller values fire first
    let mut scheduled_elements = original_array.clone();
    scheduled_elements.sort(); // @step:schedule

    let mut output_array: Vec<i64> = Vec::new(); // @step:schedule

    // Elements "wake up" in order of their value (their simulated delay)
    for wake_index in 0..array_length {
        // @step:wake-up
        let waking_value = scheduled_elements[wake_index]; // @step:wake-up

        // Compare with next sleeping element to show scheduling relationship
        if wake_index + 1 < array_length {
            // @step:compare
            let _next_sleeping = scheduled_elements[wake_index + 1]; // @step:compare — next element still sleeping
        }

        output_array.push(waking_value); // @step:swap
        // @step:mark-sorted
    }

    output_array // @step:complete
}
