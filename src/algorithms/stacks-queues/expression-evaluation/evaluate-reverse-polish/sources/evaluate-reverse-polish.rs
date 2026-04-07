// Evaluate Reverse Polish Notation — push operands, pop two and compute on operators
fn evaluate_reverse_polish(tokens: &[&str]) -> i64 {
    let mut operand_stack: Vec<i64> = Vec::new(); // @step:initialize
    let operators = ["+", "-", "*", "/"]; // @step:initialize
    for current_token in tokens {
        // @step:visit
        if operators.contains(current_token) {
            let operand_b = operand_stack.pop().unwrap_or(0); // @step:evaluate
            let operand_a = operand_stack.pop().unwrap_or(0); // @step:evaluate
            let result = match *current_token {
                "+" => operand_a + operand_b, // @step:evaluate
                "-" => operand_a - operand_b, // @step:evaluate
                "*" => operand_a * operand_b, // @step:evaluate
                _ => {
                    // Truncate toward zero like most languages
                    let quotient = operand_a as f64 / operand_b as f64; // @step:evaluate
                    quotient.trunc() as i64
                }
            };
            operand_stack.push(result); // @step:push
        } else {
            let parsed = current_token.parse::<i64>().unwrap_or(0);
            operand_stack.push(parsed); // @step:push
        }
    }
    *operand_stack.first().unwrap_or(&0) // @step:complete
}

fn main() {
    let tokens = vec!["2", "1", "+", "3", "*"];
    println!("{}", evaluate_reverse_polish(&tokens));
}
