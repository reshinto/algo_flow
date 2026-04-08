// Remove All Adjacent Duplicates — use a stack to repeatedly remove adjacent duplicate pairs
fn remove_all_adjacent_duplicates(input_string: &str) -> String {
    let mut stack: Vec<char> = Vec::new(); // @step:initialize
    for ch in input_string.chars() {
        // @step:visit
        let stack_top = stack.last().copied(); // @step:visit
        if !stack.is_empty() && stack_top == Some(ch) {
            stack.pop(); // @step:match
        } else {
            stack.push(ch); // @step:push
        }
    }
    // Remaining stack characters form the result after all duplicate pairs removed
    stack.into_iter().collect() // @step:complete
}

fn main() {
    println!("{}", remove_all_adjacent_duplicates("abbaca"));
}
