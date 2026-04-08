// Sort Characters by Frequency — sort a string by character frequency using a frequency map + bucket sort
use std::collections::HashMap;

fn sort_characters_by_frequency(text: &str) -> String {
    let mut freq_map: HashMap<char, usize> = HashMap::new(); // @step:initialize
    for current_char in text.chars() {
        *freq_map.entry(current_char).or_insert(0) += 1; // @step:increment-count
    }
    // Bucket sort: index = frequency, value = list of chars with that frequency
    let mut buckets: Vec<Vec<char>> = vec![Vec::new(); text.len() + 1];
    for (&char_val, &freq) in &freq_map {
        buckets[freq].push(char_val); // @step:key-found
    }
    let mut result = String::new();
    for bucket_idx in (0..buckets.len()).rev() {
        for &char_val in &buckets[bucket_idx] {
            for _ in 0..bucket_idx {
                result.push(char_val); // @step:key-found
            }
        }
    }
    result // @step:complete
}
