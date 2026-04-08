// Design Circular Queue — fixed-capacity ring buffer with front/rear pointers (LeetCode 622)
fn design_circular_queue(operations: &[&str], capacity: usize) -> Vec<String> {
    let mut buffer: Vec<Option<i32>> = vec![None; capacity]; // @step:initialize
    let mut front_index: i64 = -1; // @step:initialize
    let mut rear_index: i64 = -1; // @step:initialize
    let mut queue_size: usize = 0; // @step:initialize
    let mut results: Vec<String> = Vec::new(); // @step:initialize

    for operation in operations {
        // @step:visit
        if operation.starts_with("enqueue") {
            let value: i32 = operation.split_whitespace().nth(1).unwrap_or("0").parse().unwrap_or(0); // @step:enqueue
            if queue_size == capacity { // @step:enqueue
                results.push("full".to_string()); // @step:enqueue
            } else {
                if front_index == -1 { // @step:enqueue
                    front_index = 0; // @step:enqueue
                }
                rear_index = (rear_index + 1) % capacity as i64; // @step:enqueue
                buffer[rear_index as usize] = Some(value); // @step:enqueue
                queue_size += 1; // @step:enqueue
                results.push("true".to_string()); // @step:enqueue
            }
        } else if *operation == "dequeue" {
            if queue_size == 0 { // @step:dequeue
                results.push("empty".to_string()); // @step:dequeue
            } else {
                let dequeued_value = buffer[front_index as usize].unwrap_or(0); // @step:dequeue
                buffer[front_index as usize] = None; // @step:dequeue
                if front_index == rear_index { // @step:dequeue
                    front_index = -1; // @step:dequeue
                    rear_index = -1; // @step:dequeue
                } else {
                    front_index = (front_index + 1) % capacity as i64; // @step:dequeue
                }
                queue_size -= 1; // @step:dequeue
                results.push(dequeued_value.to_string()); // @step:dequeue
            }
        } else if *operation == "front" {
            if front_index == -1 { // @step:peek
                results.push("empty".to_string()); // @step:peek
            } else {
                results.push(buffer[front_index as usize].unwrap_or(0).to_string()); // @step:peek
            }
        } else if *operation == "rear" {
            if rear_index == -1 { // @step:peek
                results.push("empty".to_string()); // @step:peek
            } else {
                results.push(buffer[rear_index as usize].unwrap_or(0).to_string()); // @step:peek
            }
        }
    }

    results // @step:complete
}

fn main() {
    let ops = vec!["enqueue 1", "enqueue 2", "front", "dequeue", "rear"];
    println!("{:?}", design_circular_queue(&ops, 3));
}
