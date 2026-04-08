// Character Frequency Sort
// Sorts a string by character frequency (descending) using bucket sort.
// Time: O(n) where n = length of text (bucket sort avoids O(n log n) comparison sort)
// Space: O(n) — frequency map and output string both scale with input size

use std::collections::HashMap;

fn character_frequency_sort(text: &str) -> String {
    if text.is_empty() { return String::new(); } // @step:initialize

    let mut frequency_map: HashMap<char, usize> = HashMap::new(); // @step:initialize

    for ch in text.chars() {
        // @step:update-frequency
        *frequency_map.entry(ch).or_insert(0) += 1; // @step:update-frequency
    }

    // Bucket sort: index = frequency, value = list of chars with that frequency
    let max_frequency = text.len(); // @step:sort-by-frequency
    let mut buckets: Vec<Vec<char>> = vec![Vec::new(); max_frequency + 1]; // @step:sort-by-frequency

    for (ch, freq) in &frequency_map {
        // @step:sort-by-frequency
        buckets[*freq].push(*ch); // @step:sort-by-frequency
    }

    let mut result = String::new(); // @step:build-output
    for freq_idx in (1..=max_frequency).rev() {
        // @step:build-output
        for &ch in &buckets[freq_idx] {
            // @step:add-to-result
            for _ in 0..freq_idx {
                result.push(ch); // @step:add-to-result
            }
        }
    }

    result // @step:complete
}
