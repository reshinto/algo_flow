// Set Complement using a Hash Set
// Returns all elements in the universal set U that are NOT in set A.
// Complement = U \ A
// Time: O(n + u) — O(n) to build the set from A, O(u) to scan the universal set
// Space: O(n) for the hash set

use std::collections::HashSet;

fn set_complement(array_a: &[i32], universal_set: &[i32]) -> Vec<i32> {
    let mut hash_set: HashSet<i32> = HashSet::new(); // @step:initialize
    let mut result: Vec<i32> = Vec::new();           // @step:initialize

    // Phase 1: build the hash set from array A
    for &value_a in array_a {
        hash_set.insert(value_a); // @step:add-to-set
    }

    // Phase 2: collect elements in the universal set that are NOT in A
    for &value_u in universal_set {
        if hash_set.contains(&value_u) {
            // value_u is in A, so skip it
            let _ = value_u; // @step:skip-element
        } else {
            // value_u is not in A — it belongs to the complement
            result.push(value_u); // @step:add-to-result
        }
    }

    result // @step:complete
}

fn main() {
    let array_a = vec![1, 2, 3];
    let universal_set = vec![1, 2, 3, 4, 5];
    let result = set_complement(&array_a, &universal_set);
    println!("{:?}", result);
}
