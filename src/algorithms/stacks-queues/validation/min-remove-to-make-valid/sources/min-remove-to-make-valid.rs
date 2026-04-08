// Min Remove to Make Valid — use a stack of indices to track unmatched '(' and a set for unmatched ')'
use std::collections::HashSet;

fn min_remove_to_make_valid(input_string: &str) -> String {
    let mut unmatched_open_indices: Vec<usize> = Vec::new(); // @step:initialize
    let mut unmatched_close_indices: HashSet<usize> = HashSet::new(); // @step:initialize
    let chars: Vec<char> = input_string.chars().collect();
    for char_idx in 0..chars.len() {
        let ch = chars[char_idx]; // @step:visit
        if ch == '(' {
            unmatched_open_indices.push(char_idx); // @step:push
        } else if ch == ')' {
            if !unmatched_open_indices.is_empty() {
                unmatched_open_indices.pop(); // @step:pop
            } else {
                unmatched_close_indices.insert(char_idx); // @step:mismatch
            }
        }
    }
    // Remaining indices in the stack are unmatched opening brackets
    let mut unmatched_indices: HashSet<usize> = unmatched_close_indices; // @step:mismatch
    for idx in &unmatched_open_indices {
        unmatched_indices.insert(*idx);
    }
    let mut result = String::new(); // @step:complete
    for char_idx in 0..chars.len() {
        if !unmatched_indices.contains(&char_idx) {
            result.push(chars[char_idx]); // @step:complete
        }
    }
    result // @step:complete
}

fn main() {
    println!("{}", min_remove_to_make_valid("lee(t(c)o)de)"));
}
