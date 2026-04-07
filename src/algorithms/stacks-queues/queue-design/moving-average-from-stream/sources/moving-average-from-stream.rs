// Moving Average from Data Stream — fixed-size sliding window queue (LeetCode 346)
use std::collections::VecDeque;

fn moving_average_from_stream(values: &[f64], window_size: usize) -> Vec<f64> {
    let mut queue: VecDeque<f64> = VecDeque::new(); // @step:initialize
    let mut running_sum: f64 = 0.0; // @step:initialize
    let mut averages: Vec<f64> = Vec::new(); // @step:initialize

    for value_index in 0..values.len() {
        let current_value = values[value_index]; // @step:visit

        queue.push_back(current_value); // @step:enqueue
        running_sum += current_value; // @step:enqueue

        if queue.len() > window_size { // @step:dequeue
            running_sum -= queue.pop_front().unwrap_or(0.0); // @step:dequeue
        }

        averages.push(running_sum / queue.len() as f64); // @step:complete
    }

    averages // @step:complete
}

fn main() {
    let values = vec![1.0, 10.0, 3.0, 5.0];
    println!("{:?}", moving_average_from_stream(&values, 3));
}
