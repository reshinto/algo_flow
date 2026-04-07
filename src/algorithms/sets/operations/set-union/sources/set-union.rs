// Set Union using a Hash Set
// Returns all unique elements from both arrayA and arrayB.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n + m) for the hash set and result

use std::collections::HashSet;

fn set_union(array_a: &[i32], array_b: &[i32]) -> Vec<i32> {
    let mut hash_set: HashSet<i32> = HashSet::new(); // @step:initialize
    let mut result: Vec<i32> = Vec::new();           // @step:initialize

    // Phase 1: add all elements of array A to hash set and result
    for &value_a in array_a {
        hash_set.insert(value_a); // @step:add-to-set
        result.push(value_a);
    }

    // Phase 2: add elements of array B that are not already in the hash set
    for &value_b in array_b {
        if hash_set.contains(&value_b) {
            // value_b already in result — skip
            let _ = value_b; // @step:skip-element
        } else {
            // value_b is only in array B — add to result
            result.push(value_b); // @step:add-to-result
        }
    }

    result // @step:complete
}

fn main() {
    let array_a = vec![1, 2, 3];
    let array_b = vec![3, 4, 5];
    let result = set_union(&array_a, &array_b);
    println!("{:?}", result);
}
