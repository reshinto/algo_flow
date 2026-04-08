// Four Sum II — count tuples (i,j,k,l) such that A[i]+B[j]+C[k]+D[l] == 0
use std::collections::HashMap;

fn four_sum_ii(nums_a: &[i32], nums_b: &[i32], nums_c: &[i32], nums_d: &[i32]) -> i32 {
    let mut pair_sum_counts: HashMap<i32, i32> = HashMap::new(); // @step:initialize

    // Phase 1: build map of all A+B pair sums with their occurrence counts
    for &outer_val in nums_a {
        for &inner_val in nums_b {
            let pair_sum = outer_val + inner_val;
            if pair_sum_counts.contains_key(&pair_sum) {
                *pair_sum_counts.get_mut(&pair_sum).unwrap() += 1; // @step:increment-count
            } else {
                pair_sum_counts.insert(pair_sum, 1); // @step:insert-key
            }
        }
    }

    // Phase 2: for each C+D pair, check if its negation exists in the map
    let mut tuple_count = 0;
    for &outer_val in nums_c {
        for &inner_val in nums_d {
            let complement = -(outer_val + inner_val);
            if let Some(&count) = pair_sum_counts.get(&complement) {
                // @step:key-found
                tuple_count += count; // @step:key-found
            }
            // @step:key-not-found
        }
    }

    tuple_count // @step:complete
}
