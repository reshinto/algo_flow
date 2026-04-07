// String Compression (Run-Length Encoding) — count consecutive repeated characters.
// Returns the compressed form "a2b1c5a3" only if shorter than the original; otherwise returns the original.
// Time: O(n)  Space: O(n) for the output buffer

fn string_compression(text: &str) -> String {
    let chars: Vec<char> = text.chars().collect();
    if chars.is_empty() { return text.to_string(); } // @step:initialize

    let mut compressed = String::new(); // @step:initialize
    let mut char_index = 0usize; // @step:initialize

    while char_index < chars.len() {
        let current_char = chars[char_index]; // @step:read-char
        let mut count = 0usize; // @step:read-char

        while char_index < chars.len() && chars[char_index] == current_char {
            count += 1; // @step:count
            char_index += 1; // @step:count
        }

        compressed.push(current_char); // @step:write-char
        compressed.push_str(&count.to_string()); // @step:write-char
    }

    if compressed.len() < chars.len() { compressed } else { text.to_string() } // @step:complete
}
