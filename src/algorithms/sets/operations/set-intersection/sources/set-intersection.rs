// Set Intersection using a Hash Set
// Returns all elements that appear in both arrayA and arrayB (no duplicates).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

use std::collections::HashSet;

fn set_intersection(array_a: &[i32], array_b: &[i32]) -> Vec<i32> {
    let mut hash_set: HashSet<i32> = HashSet::new(); // @step:initialize
    let mut result: Vec<i32> = Vec::new();           // @step:initialize

    // Phase 1: build the hash set from array A
    for &value_a in array_a {
        hash_set.insert(value_a); // @step:add-to-set
    }

    // Phase 2: check each element of array B for membership
    for &value_b in array_b {
        if hash_set.contains(&value_b) {
            // value_b is in both arrays
            result.push(value_b); // @step:member-found
            hash_set.remove(&value_b); // prevent duplicate results
        } else {
            // value_b is only in array B
            let _ = value_b; // @step:member-not-found
        }
    }

    result // @step:complete
}

fn main() {
    let array_a = vec![1, 2, 3, 4];
    let array_b = vec![3, 4, 5, 6];
    let result = set_intersection(&array_a, &array_b);
    println!("{:?}", result);
}
