// First Non-Repeating Char Stream — use a queue as candidate buffer and a frequency map to find the first non-repeating character at each step
use std::collections::HashMap;
use std::collections::VecDeque;

fn first_non_repeating_char_stream(input_string: &str) -> Vec<String> {
    let mut freq_map: HashMap<char, usize> = HashMap::new(); // @step:initialize
    let mut queue: VecDeque<char> = VecDeque::new(); // @step:initialize
    let mut results: Vec<String> = Vec::new(); // @step:initialize
    for ch in input_string.chars() {
        // @step:visit
        *freq_map.entry(ch).or_insert(0) += 1; // @step:visit
        queue.push_back(ch); // @step:enqueue
        // Remove repeated characters from the front of the queue
        while let Some(&front) = queue.front() {
            if *freq_map.get(&front).unwrap_or(&0) > 1 { // @step:dequeue
                queue.pop_front(); // @step:dequeue
            } else {
                break;
            }
        }
        let answer = queue.front().map(|c| c.to_string()).unwrap_or_else(|| "#".to_string()); // @step:peek
        results.push(answer); // @step:peek
    }
    results // @step:complete
}

fn main() {
    let results = first_non_repeating_char_stream("aabcbc");
    println!("{:?}", results);
}
