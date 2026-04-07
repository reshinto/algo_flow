// Design Circular Deque — fixed-capacity ring buffer with front/rear insertion and removal (LeetCode 641)
fn design_circular_deque(operations: &[&str], capacity: usize) -> Vec<String> {
    let mut buffer: Vec<Option<i32>> = vec![None; capacity]; // @step:initialize
    let mut front_index: i64 = -1; // @step:initialize
    let mut rear_index: i64 = -1; // @step:initialize
    let mut deque_size: usize = 0; // @step:initialize
    let mut results: Vec<String> = Vec::new(); // @step:initialize

    for operation in operations {
        // @step:visit
        if operation.starts_with("pushBack") {
            let value: i32 = operation.split_whitespace().nth(1).unwrap_or("0").parse().unwrap_or(0); // @step:enqueue
            if deque_size == capacity { // @step:enqueue
                results.push("full".to_string()); // @step:enqueue
            } else {
                if front_index == -1 { // @step:enqueue
                    front_index = 0; // @step:enqueue
                }
                rear_index = (rear_index + 1) % capacity as i64; // @step:enqueue
                buffer[rear_index as usize] = Some(value); // @step:enqueue
                deque_size += 1; // @step:enqueue
                results.push("true".to_string()); // @step:enqueue
            }
        } else if operation.starts_with("pushFront") {
            let value: i32 = operation.split_whitespace().nth(1).unwrap_or("0").parse().unwrap_or(0); // @step:enqueue-front
            if deque_size == capacity { // @step:enqueue-front
                results.push("full".to_string()); // @step:enqueue-front
            } else {
                if front_index == -1 { // @step:enqueue-front
                    front_index = 0; // @step:enqueue-front
                    rear_index = 0; // @step:enqueue-front
                } else {
                    front_index = (front_index - 1 + capacity as i64) % capacity as i64; // @step:enqueue-front
                }
                buffer[front_index as usize] = Some(value); // @step:enqueue-front
                deque_size += 1; // @step:enqueue-front
                results.push("true".to_string()); // @step:enqueue-front
            }
        } else if *operation == "popFront" {
            if deque_size == 0 { // @step:dequeue
                results.push("empty".to_string()); // @step:dequeue
            } else {
                let popped_value = buffer[front_index as usize].unwrap_or(0); // @step:dequeue
                buffer[front_index as usize] = None; // @step:dequeue
                if front_index == rear_index { // @step:dequeue
                    front_index = -1; // @step:dequeue
                    rear_index = -1; // @step:dequeue
                } else {
                    front_index = (front_index + 1) % capacity as i64; // @step:dequeue
                }
                deque_size -= 1; // @step:dequeue
                results.push(popped_value.to_string()); // @step:dequeue
            }
        } else if *operation == "popBack" {
            if deque_size == 0 { // @step:dequeue-rear
                results.push("empty".to_string()); // @step:dequeue-rear
            } else {
                let popped_value = buffer[rear_index as usize].unwrap_or(0); // @step:dequeue-rear
                buffer[rear_index as usize] = None; // @step:dequeue-rear
                if front_index == rear_index { // @step:dequeue-rear
                    front_index = -1; // @step:dequeue-rear
                    rear_index = -1; // @step:dequeue-rear
                } else {
                    rear_index = (rear_index - 1 + capacity as i64) % capacity as i64; // @step:dequeue-rear
                }
                deque_size -= 1; // @step:dequeue-rear
                results.push(popped_value.to_string()); // @step:dequeue-rear
            }
        } else if *operation == "peekFront" {
            if front_index == -1 { // @step:peek
                results.push("empty".to_string()); // @step:peek
            } else {
                results.push(buffer[front_index as usize].unwrap_or(0).to_string()); // @step:peek
            }
        } else if *operation == "peekRear" {
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
    let ops = vec!["pushBack 1", "pushBack 2", "peekFront", "popFront", "peekRear"];
    println!("{:?}", design_circular_deque(&ops, 3));
}
