// Backspace String Compare — use a stack to process each string, treating '#' as backspace
fn process_with_backspace(input_str: &str) -> Vec<char> {
    let mut result_stack: Vec<char> = Vec::new(); // @step:initialize
    for ch in input_str.chars() {
        // @step:visit
        if ch == '#' {
            result_stack.pop(); // @step:pop
        } else {
            result_stack.push(ch); // @step:push
        }
    }
    result_stack // @step:compare
}

fn backspace_string_compare(first_string: &str, second_string: &str) -> bool {
    let processed_first = process_with_backspace(first_string); // @step:initialize
    let processed_second = process_with_backspace(second_string); // @step:initialize
    if processed_first.len() != processed_second.len() {
        return false; // @step:compare
    }
    for char_idx in 0..processed_first.len() {
        if processed_first[char_idx] != processed_second[char_idx] {
            return false; // @step:compare
        }
    }
    true // @step:complete
}

fn main() {
    println!("{}", backspace_string_compare("ab#c", "ad#c"));
}
