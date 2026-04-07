// Decode String — use a stack to decode encoded strings like "3[a2[c]]" → "accaccacc"
fn decode_string(input_string: &str) -> String {
    let mut count_stack: Vec<usize> = Vec::new(); // @step:initialize
    let mut string_stack: Vec<String> = Vec::new(); // @step:initialize
    let mut current_string = String::new(); // @step:initialize
    let mut current_count: usize = 0; // @step:initialize

    for current_char in input_string.chars() {
        // @step:visit
        if current_char.is_ascii_digit() {
            // Build up multi-digit multipliers
            current_count = current_count * 10 + current_char.to_digit(10).unwrap_or(0) as usize; // @step:visit
        } else if current_char == '[' {
            // Push current context onto stacks and reset for nested segment
            count_stack.push(current_count); // @step:push
            string_stack.push(current_string.clone()); // @step:push
            current_count = 0; // @step:push
            current_string = String::new(); // @step:push
        } else if current_char == ']' {
            // Pop context and expand the repeated segment
            let repeat_count = count_stack.pop().unwrap_or(0); // @step:pop
            let prev_string = string_stack.pop().unwrap_or_default(); // @step:pop
            current_string = prev_string + &current_string.repeat(repeat_count); // @step:pop
        } else {
            // Regular character — append to current string accumulator
            current_string.push(current_char); // @step:visit
        }
    }

    current_string // @step:complete
}

fn main() {
    println!("{}", decode_string("3[a2[c]]"));
}
