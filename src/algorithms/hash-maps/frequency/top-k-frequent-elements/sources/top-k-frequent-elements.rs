// Top K Frequent Elements — find the k most frequent elements using frequency map + bucket sort
use std::collections::HashMap;

fn top_k_frequent_elements(numbers: &[i32], top_k: usize) -> Vec<i32> {
    let mut freq_map: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    for &current in numbers {
        *freq_map.entry(current).or_insert(0) += 1; // @step:increment-count
    }
    // Bucket sort: index = frequency, value = list of elements with that frequency
    let mut buckets: Vec<Vec<i32>> = vec![Vec::new(); numbers.len() + 1];
    for (&num, &freq) in &freq_map {
        buckets[freq].push(num); // @step:key-found
    }
    let mut result: Vec<i32> = Vec::new();
    for bucket_idx in (0..buckets.len()).rev() {
        if result.len() >= top_k {
            break;
        }
        for &num in &buckets[bucket_idx] {
            result.push(num); // @step:key-found
            if result.len() == top_k {
                break;
            }
        }
    }
    result // @step:complete
}
