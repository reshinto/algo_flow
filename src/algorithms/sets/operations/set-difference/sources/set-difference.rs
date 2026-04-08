// Set Difference using a Hash Set
// Returns all elements in arrayA that are NOT in arrayB (A \ B).
// Time: O(n + m) — O(m) to build the set, O(n) to filter
// Space: O(m) for the hash set

use std::collections::HashSet;

fn set_difference(array_a: &[i32], array_b: &[i32]) -> Vec<i32> {
    let mut hash_set: HashSet<i32> = HashSet::new(); // @step:initialize
    let mut result: Vec<i32> = Vec::new();           // @step:initialize

    // Phase 1: build the hash set from array B
    for &value_b in array_b {
        hash_set.insert(value_b); // @step:add-to-set
    }

    // Phase 2: include only elements of array A not found in the hash set
    for &value_a in array_a {
        if hash_set.contains(&value_a) {
            // value_a exists in B — exclude from result
            let _ = value_a; // @step:skip-element
        } else {
            // value_a is only in A — include in result
            result.push(value_a); // @step:add-to-result
        }
    }

    result // @step:complete
}

fn main() {
    let array_a = vec![1, 2, 3, 4, 5];
    let array_b = vec![3, 4, 5, 6];
    let result = set_difference(&array_a, &array_b);
    println!("{:?}", result);
}
