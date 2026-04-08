// Set Equality using a Hash Set
// Determines whether arrayA and arrayB contain exactly the same unique elements (A = B).
// Two sets are equal iff A ⊆ B and B ⊆ A, which implies equal unique element counts.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

use std::collections::HashSet;

fn set_equality(array_a: &[i32], array_b: &[i32]) -> bool {
    let mut hash_set: HashSet<i32> = HashSet::new(); // @step:initialize
    let mut unique_count_a = 0usize;

    // Phase 1: build the hash set from arrayA, counting unique elements
    for &value_a in array_a {
        if !hash_set.contains(&value_a) {
            unique_count_a += 1;
        }
        hash_set.insert(value_a); // @step:add-to-set
    }

    // Phase 2: check each element of arrayB for membership; count unique elements in B
    let mut unique_count_b = 0usize;
    let mut seen_in_b: HashSet<i32> = HashSet::new();

    for &value_b in array_b {
        if !seen_in_b.contains(&value_b) {
            unique_count_b += 1;
            seen_in_b.insert(value_b);
        }

        if hash_set.contains(&value_b) {
            // value_b is present in arrayA — A ⊇ {value_b} holds so far
            let _ = value_b; // @step:subset-pass
        } else {
            // value_b is missing from arrayA — sets cannot be equal
            return false; // @step:subset-fail
        }
    }

    // Equal iff all B elements are in A and both have the same unique count
    let is_equal = unique_count_a == unique_count_b;
    is_equal // @step:complete
}

fn main() {
    let array_a = vec![1, 2, 3];
    let array_b = vec![3, 1, 2];
    println!("{}", set_equality(&array_a, &array_b));
}
