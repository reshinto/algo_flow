// Superset Check using a Hash Set
// Determines whether every element of arrayB also appears in arrayA (A ⊇ B).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

use std::collections::HashSet;

fn superset_check(array_a: &[i32], array_b: &[i32]) -> bool {
    let mut hash_set: HashSet<i32> = HashSet::new(); // @step:initialize

    // Phase 1: build the hash set from arrayA
    for &value_a in array_a {
        hash_set.insert(value_a); // @step:add-to-set
    }

    // Phase 2: check each element of arrayB for membership in the hash set
    for &value_b in array_b {
        if hash_set.contains(&value_b) {
            // value_b is present in arrayA — condition holds so far
            let _ = value_b; // @step:subset-pass
        } else {
            // value_b is missing from arrayA — A is not a superset of B
            return false; // @step:subset-fail
        }
    }

    true // @step:complete
}

fn main() {
    let array_a = vec![1, 2, 3, 4, 5];
    let array_b = vec![1, 2, 3];
    println!("{}", superset_check(&array_a, &array_b));
}
