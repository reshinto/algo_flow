// Subset Check using a Hash Set
// Determines whether every element of arrayA also appears in arrayB (A ⊆ B).
// Time: O(n + m) — O(m) to build the set, O(n) to check membership
// Space: O(m) for the hash set

use std::collections::HashSet;

fn subset_check(array_a: &[i32], array_b: &[i32]) -> bool {
    let mut hash_set: HashSet<i32> = HashSet::new(); // @step:initialize

    // Phase 1: build the hash set from arrayB
    for &value_b in array_b {
        hash_set.insert(value_b); // @step:add-to-set
    }

    // Phase 2: check each element of arrayA for membership in the hash set
    for &value_a in array_a {
        if hash_set.contains(&value_a) {
            // value_a is present in arrayB — condition holds so far
            let _ = value_a; // @step:subset-pass
        } else {
            // value_a is missing from arrayB — A is not a subset of B
            return false; // @step:subset-fail
        }
    }

    true // @step:complete
}

fn main() {
    let array_a = vec![1, 2, 3];
    let array_b = vec![1, 2, 3, 4, 5];
    println!("{}", subset_check(&array_a, &array_b));
}
