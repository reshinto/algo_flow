// Remove K Digits — greedy monotonic stack to produce the smallest number after k removals
fn remove_k_digits(num: &str, removal_count: usize) -> String {
    let mut digit_stack: Vec<char> = Vec::new(); // @step:initialize
    let mut removals_left = removal_count; // @step:initialize

    for current_digit in num.chars() {
        // @step:visit
        // While we still have removals and the stack top is greater than the current digit, pop it
        while removals_left > 0 && !digit_stack.is_empty() && *digit_stack.last().unwrap() > current_digit {
            // @step:compare
            digit_stack.pop(); // @step:pop
            removals_left -= 1; // @step:maintain-monotonic
        }
        digit_stack.push(current_digit); // @step:push
    }

    // Remove remaining digits from the end if we still have removals left
    while removals_left > 0 {
        digit_stack.pop(); // @step:pop
        removals_left -= 1; // @step:complete
    }

    // Strip leading zeros and return; default to "0" for an empty result
    let joined: String = digit_stack.into_iter().collect();
    let stripped = joined.trim_start_matches('0');
    if stripped.is_empty() { "0".to_string() } else { stripped.to_string() } // @step:complete
}

fn main() {
    println!("{}", remove_k_digits("1432219", 3));
}
