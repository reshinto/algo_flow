// Word Break tabulation — determine if a string can be segmented into dictionary words bottom-up

fn word_break_tabulation(text: &str, dictionary: &[&str]) -> bool {
    // @step:initialize
    let text_length = text.len(); // @step:initialize
    let mut dp_table = vec![0u8; text_length + 1]; // @step:initialize
    dp_table[0] = 1; // @step:fill-table
    for end_index in 1..=text_length {
        // @step:read-cache
        for &word in dictionary {
            // @step:read-cache
            if end_index >= word.len() {
                // @step:read-cache
                let start = end_index - word.len();
                let segment = &text[start..end_index]; // @step:read-cache
                if segment == word && dp_table[end_index - word.len()] == 1 {
                    // @step:read-cache
                    dp_table[end_index] = 1; // @step:read-cache
                }
            }
            // @step:compute-cell
        }
    }
    dp_table[text_length] == 1 // @step:complete
}

fn main() {
    let text = "leetcode";
    let dictionary = vec!["leet", "code"];
    let result = word_break_tabulation(text, &dictionary);
    println!("Can break \"{}\": {}", text, result);
}
