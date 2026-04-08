// Multiset Intersection (Bag Intersection) using frequency Maps
// For each element, take the MIN count from arrayA and arrayB.
// Time: O(n + m) — one pass over each array plus iteration over shared keys
// Space: O(n + m) for the two frequency maps

use std::collections::HashMap;

fn multiset_intersection(array_a: &[i32], array_b: &[i32]) -> Vec<i32> {
    let mut counts_a: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    let mut counts_b: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    let mut result: Vec<i32> = Vec::new();                  // @step:initialize

    // Phase 1: count frequencies in arrayA
    for &value_a in array_a {
        *counts_a.entry(value_a).or_insert(0) += 1; // @step:count-element
    }

    // Phase 2: count frequencies in arrayB
    for &value_b in array_b {
        *counts_b.entry(value_b).or_insert(0) += 1; // @step:count-element
    }

    // Phase 3: for each element in A, take min(countA, countB) copies
    for (&value, &count_a) in &counts_a {
        let count_b = *counts_b.get(&value).unwrap_or(&0);
        let min_count = count_a.min(count_b); // @step:compare-count
        for _ in 0..min_count {
            result.push(value); // @step:add-to-result
        }
    }

    result.sort();
    result // @step:complete
}

fn main() {
    let array_a = vec![1, 2, 2, 3, 3, 3];
    let array_b = vec![2, 2, 3, 4];
    let result = multiset_intersection(&array_a, &array_b);
    println!("{:?}", result);
}
