// Implement Queue Using Stacks — use two stacks to emulate FIFO queue behaviour (LeetCode 232)
fn implement_queue_using_stacks(values: &[i32]) -> Vec<i32> {
    let mut input_stack: Vec<i32> = Vec::new(); // @step:initialize
    let mut output_stack: Vec<i32> = Vec::new(); // @step:initialize
    let mut dequeue_results: Vec<i32> = Vec::new(); // @step:initialize

    // Push phase — enqueue all values into the input stack
    for element_idx in 0..values.len() {
        let current_value = values[element_idx]; // @step:visit
        input_stack.push(current_value); // @step:push
    }

    // Dequeue phase — transfer when output stack is empty, then pop
    while !input_stack.is_empty() || !output_stack.is_empty() {
        if output_stack.is_empty() {
            // Transfer all elements from input stack to output stack
            while let Some(transferred_value) = input_stack.pop() {
                output_stack.push(transferred_value); // @step:transfer
            }
        }
        let dequeued_value = output_stack.pop().unwrap(); // @step:pop
        dequeue_results.push(dequeued_value); // @step:pop
    }

    dequeue_results // @step:complete
}

fn main() {
    println!("{:?}", implement_queue_using_stacks(&[1, 2, 3, 4]));
}
