// Longest Valid Parentheses — find the length of the longest well-formed parentheses substring
fn longest_valid_parentheses(input_string: &str) -> usize {
    let mut index_stack: Vec<i64> = vec![-1]; // @step:initialize
    let mut max_length: usize = 0; // @step:initialize
    let chars: Vec<char> = input_string.chars().collect();
    for char_idx in 0..chars.len() {
        let ch = chars[char_idx]; // @step:visit
        if ch == '(' {
            index_stack.push(char_idx as i64); // @step:push
        } else {
            // Pop the top; if stack becomes empty, push current index as new base
            index_stack.pop(); // @step:pop
            if index_stack.is_empty() {
                index_stack.push(char_idx as i64); // @step:push
            } else {
                // Length of current valid substring = current index minus new stack top
                let stack_top = *index_stack.last().unwrap(); // @step:compare
                let current_length = char_idx as i64 - stack_top; // @step:compare
                if current_length as usize > max_length {
                    max_length = current_length as usize; // @step:compare
                }
            }
        }
    }
    max_length // @step:complete
}

fn main() {
    println!("{}", longest_valid_parentheses(")()())"));
}
