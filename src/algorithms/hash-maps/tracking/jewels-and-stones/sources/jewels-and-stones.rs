// Jewels and Stones — count how many stones are also jewels using a hash set
use std::collections::HashSet;

fn jewels_and_stones(jewels: &str, stones: &str) -> usize {
    let mut jewel_set: HashSet<char> = HashSet::new(); // @step:initialize
    for jewel_char in jewels.chars() {
        jewel_set.insert(jewel_char); // @step:insert-key
    }
    let mut count = 0;
    for stone in stones.chars() {
        if jewel_set.contains(&stone) {
            // @step:lookup-key
            count += 1; // @step:key-found
        } else {
            // @step:key-not-found
        }
    }
    count // @step:complete
}
