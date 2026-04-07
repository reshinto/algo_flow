// LIS (Longest Increasing Subsequence) memoization — top-down recursion with cached subproblems

use std::collections::HashMap;

fn lis(sequence: &[i64], start_index: usize, memo: &mut HashMap<usize, usize>) -> usize {
    if let Some(&cached) = memo.get(&start_index) {
        return cached; // @step:read-cache
    }
    // @step:push-call
    let mut max_length = 1usize; // @step:compute-cell
    let sequence_length = sequence.len();
    for next_index in (start_index + 1)..sequence_length {
        // @step:compute-cell
        if sequence[next_index] > sequence[start_index] {
            // @step:compute-cell
            let sub_length = 1 + lis(sequence, next_index, memo); // @step:compute-cell
            if sub_length > max_length {
                // @step:compute-cell
                max_length = sub_length; // @step:compute-cell
            }
        }
    }
    memo.insert(start_index, max_length); // @step:compute-cell
    max_length // @step:pop-call
}

fn lis_memoization(sequence: &[i64]) -> usize {
    // @step:initialize
    let sequence_length = sequence.len(); // @step:initialize
    if sequence_length == 0 {
        return 0; // @step:initialize
    }
    let mut memo = HashMap::new(); // @step:initialize
    let mut result = 0usize; // @step:compute-cell
    for start_index in 0..sequence_length {
        // @step:compute-cell
        let lis_length = lis(sequence, start_index, &mut memo); // @step:compute-cell
        if lis_length > result {
            // @step:compute-cell
            result = lis_length; // @step:compute-cell
        }
    }
    result // @step:complete
}

fn main() {
    let sequence = vec![10, 9, 2, 5, 3, 7, 101, 18];
    let result = lis_memoization(&sequence);
    println!("LIS length of {:?}: {}", sequence, result);
}
