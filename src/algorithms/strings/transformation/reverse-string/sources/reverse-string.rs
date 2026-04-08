// Reverse String — two-pointer in-place swap on a character array.
// Returns the reversed version of the input string.
// Time: O(n)  Space: O(1) auxiliary (O(n) for the output string)

fn reverse_string(text: &str) -> String {
    let mut chars: Vec<char> = text.chars().collect(); // @step:initialize

    let mut left_index = 0usize; // @step:initialize
    let mut right_index = if chars.is_empty() { 0 } else { chars.len() - 1 }; // @step:initialize

    while left_index < right_index {
        let left_char = chars[left_index]; // @step:read-char
        let right_char = chars[right_index]; // @step:read-char

        chars[left_index] = right_char; // @step:swap-pointers
        chars[right_index] = left_char; // @step:swap-pointers

        left_index += 1; // @step:visit
        right_index -= 1; // @step:visit
    }

    chars.iter().collect() // @step:complete
}
