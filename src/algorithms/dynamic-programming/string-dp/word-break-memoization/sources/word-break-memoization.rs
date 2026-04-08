// Word Break memoization — determine if text can be segmented into dictionary words top-down

use std::collections::HashMap;

fn can_break(text: &str, dictionary: &[&str], start_index: usize, memo: &mut HashMap<usize, bool>) -> bool {
    let text_length = text.len();
    if start_index == text_length {
        return true; // @step:fill-table
    }
    if let Some(&cached) = memo.get(&start_index) {
        return cached; // @step:read-cache
    }
    // @step:push-call
    for &word in dictionary {
        // @step:compute-cell
        let end_index = start_index + word.len(); // @step:compute-cell
        if end_index <= text_length && &text[start_index..end_index] == word {
            // @step:compute-cell
            if can_break(text, dictionary, end_index, memo) {
                // @step:compute-cell
                memo.insert(start_index, true); // @step:compute-cell
                return true; // @step:pop-call
            }
        }
    }
    memo.insert(start_index, false); // @step:compute-cell
    false // @step:pop-call
}

fn word_break_memoization(text: &str, dictionary: &[&str]) -> bool {
    // @step:initialize
    let text_length = text.len(); // @step:initialize
    if text_length == 0 {
        return true; // @step:initialize
    }
    let mut memo = HashMap::new();
    can_break(text, dictionary, 0, &mut memo) // @step:complete
}

fn main() {
    let text = "leetcode";
    let dictionary = vec!["leet", "code"];
    let result = word_break_memoization(text, &dictionary);
    println!("Can break \"{}\": {}", text, result);
}
