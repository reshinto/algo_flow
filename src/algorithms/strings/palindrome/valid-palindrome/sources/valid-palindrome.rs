// Valid Palindrome — Two-pointer approach ignoring non-alphanumeric characters
// Returns true if the string is a palindrome when only alphanumeric characters are considered.
// Time: O(n), Space: O(1)

fn is_alphanumeric(ch: char) -> bool {
    ch.is_ascii_alphanumeric()
}

fn valid_palindrome(text: &str) -> bool {
    let chars: Vec<char> = text.chars().collect();
    let mut left_index = 0usize; // @step:initialize
    let mut right_index = if chars.is_empty() { 0 } else { chars.len() - 1 }; // @step:initialize

    while left_index < right_index {
        while left_index < right_index && !is_alphanumeric(chars[left_index]) {
            left_index += 1; // @step:skipNonAlphanumeric
        }
        while left_index < right_index && !is_alphanumeric(chars[right_index]) {
            right_index -= 1; // @step:skipNonAlphanumeric
        }

        // @step:compare
        if chars[left_index].to_ascii_lowercase() != chars[right_index].to_ascii_lowercase() {
            return false; // @step:mismatch
        }
        left_index += 1; // @step:match
        if right_index > 0 { right_index -= 1; } // @step:match
    }

    true // @step:complete
}
