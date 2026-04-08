// Palindrome Check — Two-pointer approach
// Returns true if the string reads the same forwards and backwards.
// Time: O(n), Space: O(1)

fn palindrome_check(text: &str) -> bool {
    let chars: Vec<char> = text.chars().collect();
    let mut left_index = 0usize; // @step:initialize
    let mut right_index = if chars.is_empty() { 0 } else { chars.len() - 1 }; // @step:initialize

    while left_index < right_index {
        // @step:compare
        if chars[left_index] != chars[right_index] {
            return false; // @step:mismatch
        }
        left_index += 1; // @step:match
        right_index -= 1; // @step:match
    }

    true // @step:complete
}
