// String Rotation Check — checks if pattern is a rotation of text.
// Concatenates text with itself and searches for pattern as a substring.
// Time: O(n)  Space: O(n) for the concatenated string

fn string_rotation_check(text: &str, pattern: &str) -> bool {
    if pattern.len() != text.len() { return false; } // @step:initialize

    let concatenated = format!("{}{}", text, text); // @step:write-char

    concatenated.contains(pattern) // @step:visit
}
