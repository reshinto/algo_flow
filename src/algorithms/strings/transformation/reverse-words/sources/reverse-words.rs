// Reverse Words in a String — split, reverse word order, rejoin with single spaces.
// Trims leading/trailing whitespace and collapses multiple spaces between words.
// Time: O(n)  Space: O(n)

fn reverse_words(text: &str) -> String {
    let mut words: Vec<&str> = text.split_whitespace().collect(); // @step:initialize

    let mut left_index = 0usize; // @step:initialize
    let mut right_index = if words.is_empty() { 0 } else { words.len() - 1 }; // @step:initialize

    while left_index < right_index {
        let left_word = words[left_index]; // @step:read-char
        let right_word = words[right_index]; // @step:read-char

        words[left_index] = right_word; // @step:swap-pointers
        words[right_index] = left_word; // @step:swap-pointers

        left_index += 1; // @step:visit
        right_index -= 1; // @step:visit
    }

    words.join(" ") // @step:complete
}
