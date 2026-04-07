// Basic Calculator — evaluate a simple expression string with +, -, (, ) using a stack for sign propagation
fn basic_calculator(expression: &str) -> i64 {
    let mut sign_stack: Vec<i64> = Vec::new(); // @step:initialize
    let mut running_total: i64 = 0; // @step:initialize
    let mut current_sign: i64 = 1; // @step:initialize

    let tokens: Vec<String> = {
        let mut result = Vec::new();
        let chars: Vec<char> = expression.chars().collect();
        let mut char_idx = 0;
        while char_idx < chars.len() {
            let ch = chars[char_idx];
            if ch.is_ascii_digit() {
                let mut num_str = String::new();
                while char_idx < chars.len() && chars[char_idx].is_ascii_digit() {
                    num_str.push(chars[char_idx]);
                    char_idx += 1;
                }
                result.push(num_str);
            } else if ch == '+' || ch == '-' || ch == '(' || ch == ')' {
                result.push(ch.to_string());
                char_idx += 1;
            } else {
                char_idx += 1;
            }
        }
        result
    }; // @step:initialize

    for current_token in &tokens {
        // @step:visit
        if let Ok(digit_value) = current_token.parse::<i64>() {
            running_total += current_sign * digit_value; // @step:evaluate
        } else if current_token == "+" {
            current_sign = 1; // @step:visit
        } else if current_token == "-" {
            current_sign = -1; // @step:visit
        } else if current_token == "(" {
            // Save current running total and sign, then reset for the sub-expression
            sign_stack.push(running_total); // @step:push
            sign_stack.push(current_sign); // @step:push
            running_total = 0; // @step:push
            current_sign = 1; // @step:push
        } else if current_token == ")" {
            // Pop sign and previous total, merge sub-expression result into parent context
            let popped_sign = sign_stack.pop().unwrap_or(1); // @step:pop
            let prev_total = sign_stack.pop().unwrap_or(0); // @step:pop
            running_total = prev_total + popped_sign * running_total; // @step:pop
        }
    }

    running_total // @step:complete
}

fn main() {
    println!("{}", basic_calculator("1 + (2 - 3)"));
}
