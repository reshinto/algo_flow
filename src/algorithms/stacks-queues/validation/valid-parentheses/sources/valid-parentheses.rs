// Valid Parentheses — use a stack to verify every opening bracket has a matching closing bracket
use std::collections::HashMap;

fn valid_parentheses(input_string: &str) -> bool {
    let mut stack: Vec<char> = Vec::new(); // @step:initialize
    let mut pairs: HashMap<char, char> = HashMap::new(); // @step:initialize
    pairs.insert(')', '(');
    pairs.insert(']', '[');
    pairs.insert('}', '{');
    for ch in input_string.chars() {
        // @step:push,pop
        if ch == '(' || ch == '[' || ch == '{' {
            stack.push(ch); // @step:push
        } else {
            // Closing bracket — check that stack top matches the expected opening bracket
            let expected = pairs.get(&ch).copied();
            if stack.is_empty() || stack.last().copied() != expected { // @step:mismatch
                return false; // @step:mismatch
            }
            stack.pop(); // @step:pop
        }
    }
    // Valid only if every opened bracket was closed
    stack.is_empty() // @step:complete
}

fn main() {
    println!("{}", valid_parentheses("({[]})"));
}
