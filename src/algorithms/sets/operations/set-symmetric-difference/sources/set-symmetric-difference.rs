// Set Symmetric Difference using a Hash Set
// Returns all elements in either arrayA or arrayB, but NOT in both (A △ B).
// Time: O(n + m) — O(n) to build the set, O(m) to process B, O(n) to collect remaining
// Space: O(n) for the hash set

use std::collections::HashSet;

fn set_symmetric_difference(array_a: &[i32], array_b: &[i32]) -> Vec<i32> {
    let mut hash_set: HashSet<i32> = HashSet::new(); // @step:initialize
    let mut result: Vec<i32> = Vec::new();           // @step:initialize

    // Phase 1: build the hash set from array A
    for &value_a in array_a {
        hash_set.insert(value_a); // @step:add-to-set
    }

    // Phase 2: process array B — remove common elements, add unique ones to result
    for &value_b in array_b {
        if hash_set.contains(&value_b) {
            // value_b is in both arrays — remove it (common element, excluded from result)
            hash_set.remove(&value_b); // @step:skip-element
        } else {
            // value_b is only in B — add to result
            result.push(value_b); // @step:add-to-result
        }
    }

    // Phase 3: remaining elements in hash set are only in A — add to result
    for remaining in &hash_set {
        result.push(*remaining); // @step:add-to-result
    }

    result // @step:complete
}

fn main() {
    let array_a = vec![1, 2, 3, 4];
    let array_b = vec![3, 4, 5, 6];
    let result = set_symmetric_difference(&array_a, &array_b);
    println!("{:?}", result);
}
