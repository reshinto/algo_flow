// Group Anagrams — group words that are anagrams of each other using sorted-key hashing
use std::collections::HashMap;

fn group_anagrams(words: &[&str]) -> Vec<Vec<String>> {
    let mut map: HashMap<String, Vec<String>> = HashMap::new(); // @step:initialize
    for &word in words {
        let mut sorted_chars: Vec<char> = word.chars().collect();
        sorted_chars.sort_unstable();
        let sorted_key: String = sorted_chars.into_iter().collect(); // @step:lookup-key
        let group = map.entry(sorted_key).or_insert_with(Vec::new);
        group.push(word.to_string()); // @step:update-value / @step:insert-key
    }
    map.into_values().collect() // @step:complete
}
