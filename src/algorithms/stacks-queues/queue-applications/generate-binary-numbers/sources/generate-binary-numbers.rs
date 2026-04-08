// Generate Binary Numbers — use a BFS-style queue to produce binary representations of 1 through N
use std::collections::VecDeque;

fn generate_binary_numbers(count: usize) -> Vec<String> {
    let mut queue: VecDeque<String> = VecDeque::new(); // @step:initialize
    queue.push_back("1".to_string());
    let mut result: Vec<String> = Vec::new(); // @step:initialize
    for _ in 0..count {
        let current = queue.pop_front().unwrap(); // @step:dequeue
        result.push(current.clone()); // @step:dequeue
        queue.push_back(current.clone() + "0"); // @step:enqueue
        queue.push_back(current + "1"); // @step:enqueue
    }
    result // @step:complete
}

fn main() {
    println!("{:?}", generate_binary_numbers(5));
}
