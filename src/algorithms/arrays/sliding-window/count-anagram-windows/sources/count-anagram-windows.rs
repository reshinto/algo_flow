// Count Anagram Windows — O(n) sliding window with frequency map comparison
use std::collections::HashMap;

fn count_anagram_windows(text: &[i32], pattern: &[i32]) -> (usize, Vec<usize>) {
    let pattern_length = pattern.len();
    let text_length = text.len();

    if pattern_length == 0 || pattern_length > text_length {
        // @step:initialize
        return (0, vec![]); // @step:initialize
    }

    let mut pattern_frequency: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    let mut window_frequency: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    let mut positions: Vec<usize> = Vec::new();

    // Build pattern frequency map
    for &pattern_element in pattern {
        // @step:initialize
        *pattern_frequency.entry(pattern_element).or_insert(0) += 1; // @step:initialize
    }

    // Build initial window frequency map
    for init_index in 0..pattern_length {
        // @step:move-window
        let current_element = text[init_index]; // @step:move-window
        *window_frequency.entry(current_element).or_insert(0) += 1; // @step:move-window
    }

    // Check first window
    if pattern_frequency == window_frequency {
        // @step:compare
        positions.push(0); // @step:compare
    }

    // Slide window across remaining positions
    for right_index in pattern_length..text_length {
        let left_index = right_index - pattern_length;
        let outgoing_element = text[left_index]; // @step:shrink-window
        let incoming_element = text[right_index]; // @step:expand-window

        // Remove outgoing element from window
        let outgoing_count = window_frequency[&outgoing_element] - 1; // @step:shrink-window
        if outgoing_count == 0 {
            // @step:shrink-window
            window_frequency.remove(&outgoing_element); // @step:shrink-window
        } else {
            window_frequency.insert(outgoing_element, outgoing_count); // @step:shrink-window
        }

        // Add incoming element to window
        *window_frequency.entry(incoming_element).or_insert(0) += 1; // @step:expand-window

        if pattern_frequency == window_frequency {
            // @step:compare
            positions.push(left_index + 1); // @step:compare
        }
    }

    let count = positions.len();
    (count, positions) // @step:complete
}
