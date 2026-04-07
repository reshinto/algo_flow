// Infix to Postfix — Dijkstra's Shunting-Yard: convert infix expression to postfix (RPN)
use std::collections::HashMap;

fn infix_to_postfix(expression: &str) -> String {
    let mut operator_precedence: HashMap<char, i32> = HashMap::new(); // @step:initialize
    operator_precedence.insert('+', 1);
    operator_precedence.insert('-', 1);
    operator_precedence.insert('*', 2);
    operator_precedence.insert('/', 2);
    let mut output_queue: Vec<String> = Vec::new(); // @step:initialize
    let mut operator_stack: Vec<char> = Vec::new(); // @step:initialize

    // Tokenize: collect alphanumeric runs and single-char operators/parens
    let mut tokens: Vec<String> = Vec::new(); // @step:initialize
    let chars: Vec<char> = expression.chars().collect();
    let mut char_idx = 0;
    while char_idx < chars.len() {
        let ch = chars[char_idx];
        if ch.is_alphanumeric() {
            let mut token = String::new();
            while char_idx < chars.len() && chars[char_idx].is_alphanumeric() {
                token.push(chars[char_idx]);
                char_idx += 1;
            }
            tokens.push(token);
        } else if "+-*/()".contains(ch) {
            tokens.push(ch.to_string());
            char_idx += 1;
        } else {
            char_idx += 1;
        }
    }

    for current_token in &tokens {
        // @step:visit
        let is_operand = current_token.chars().all(|c| c.is_alphanumeric());
        if is_operand {
            // Operand — send directly to output
            output_queue.push(current_token.clone()); // @step:output
        } else if let Some(&token_prec) = operator_precedence.get(&current_token.chars().next().unwrap_or(' ')) {
            // Operator — pop higher/equal-precedence operators to output first
            while let Some(&stack_top) = operator_stack.last() {
                if stack_top == '(' {
                    break;
                }
                let top_prec = *operator_precedence.get(&stack_top).unwrap_or(&0);
                if top_prec >= token_prec { // @step:compare
                    output_queue.push(operator_stack.pop().unwrap().to_string()); // @step:pop
                } else {
                    break;
                }
            }
            operator_stack.push(current_token.chars().next().unwrap()); // @step:push
        } else if current_token == "(" {
            operator_stack.push('('); // @step:push
        } else if current_token == ")" {
            // Pop to output until matching '(' is found
            while let Some(&stack_top) = operator_stack.last() {
                if stack_top == '(' {
                    break;
                }
                output_queue.push(operator_stack.pop().unwrap().to_string()); // @step:pop
            }
            operator_stack.pop(); // @step:pop — discard the '('
        }
    }

    // Drain remaining operators to output
    while let Some(op) = operator_stack.pop() {
        output_queue.push(op.to_string()); // @step:pop
    }

    output_queue.join(" ") // @step:complete
}

fn main() {
    println!("{}", infix_to_postfix("A+B*C"));
}
