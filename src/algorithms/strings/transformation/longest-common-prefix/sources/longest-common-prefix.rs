// Longest Common Prefix — vertical scanning column by column across all strings.
// Returns the longest prefix shared by every word in the input array.
// Time: O(n*m) where n = number of strings, m = min string length  Space: O(1)

fn longest_common_prefix(words: &[&str]) -> String {
    if words.is_empty() { return String::new(); } // @step:initialize

    let mut prefix_length = 0usize; // @step:initialize

    let first_word_chars: Vec<char> = words[0].chars().collect(); // @step:initialize

    'outer: for column_index in 0..first_word_chars.len() {
        let current_char = first_word_chars[column_index]; // @step:read-char

        for word_index in 1..words.len() {
            let word_chars: Vec<char> = words[word_index].chars().collect(); // @step:read-char
            let word_char = word_chars.get(column_index).copied(); // @step:read-char

            if word_char != Some(current_char) {
                break 'outer; // @step:complete
            }
        }

        prefix_length += 1; // @step:write-char
    }

    first_word_chars[..prefix_length].iter().collect() // @step:complete
}
