// Longest Consecutive Sequence — find the length of the longest consecutive run using a hash set
use std::collections::HashSet;

fn longest_consecutive_sequence(numbers: &[i32]) -> usize {
    let mut num_set: HashSet<i32> = HashSet::new(); // @step:initialize
    for &num in numbers {
        num_set.insert(num); // @step:insert-key
    }
    let mut max_length = 0;
    for &current_number in numbers {
        if !num_set.contains(&(current_number - 1)) {
            // @step:lookup-key
            // This number is a sequence start — count forward
            let mut sequence_length = 1;
            let mut next_number = current_number + 1;
            while num_set.contains(&next_number) {
                // @step:key-found
                sequence_length += 1;
                next_number += 1;
            }
            if sequence_length > max_length {
                max_length = sequence_length; // @step:key-not-found
            }
        }
    }
    max_length // @step:complete
}
