// Simplify Path — use a stack to resolve Unix path components into a canonical path
fn simplify_path(input_string: &str) -> String {
    let mut dir_stack: Vec<&str> = Vec::new(); // @step:initialize
    let components: Vec<&str> = input_string.split('/').collect(); // @step:initialize
    for part_idx in 0..components.len() {
        let component = components[part_idx]; // @step:visit
        if component.is_empty() || component == "." {
            // Skip empty segments and current-directory markers
            continue; // @step:visit
        } else if component == ".." {
            // Parent-directory marker — pop top of stack if non-empty
            if !dir_stack.is_empty() {
                dir_stack.pop(); // @step:pop
            }
        } else {
            // Valid directory name — push onto stack
            dir_stack.push(component); // @step:push
        }
    }
    // Join accumulated directories with leading slash
    format!("/{}", dir_stack.join("/")) // @step:complete
}

fn main() {
    println!("{}", simplify_path("/home/../usr/./bin/"));
}
