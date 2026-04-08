include!("sources/k-combinations.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashSet;

    #[test]
    fn c_5_3_equals_10() {
        let result = k_combinations(&[1, 2, 3, 4, 5], 3);
        assert_eq!(result.len(), 10);
    }

    #[test]
    fn every_subset_has_k_elements() {
        let result = k_combinations(&[1, 2, 3, 4, 5], 3);
        for subset in &result {
            assert_eq!(subset.len(), 3);
        }
    }

    #[test]
    fn c_4_2_equals_6() {
        let result = k_combinations(&[1, 2, 3, 4], 2);
        assert_eq!(result.len(), 6);
    }

    #[test]
    fn k_equals_n_full_set() {
        let result = k_combinations(&[1, 2, 3], 3);
        assert_eq!(result.len(), 1);
        let mut sorted = result[0].clone();
        sorted.sort();
        assert_eq!(sorted, vec![1, 2, 3]);
    }

    #[test]
    fn k_zero_returns_empty_subset() {
        let result = k_combinations(&[1, 2, 3], 0);
        assert_eq!(result.len(), 1);
        assert!(result[0].is_empty());
    }

    #[test]
    fn k_exceeds_n_returns_empty() {
        let result = k_combinations(&[1, 2], 5);
        assert!(result.is_empty());
    }

    #[test]
    fn empty_input_with_positive_k() {
        let result = k_combinations(&[], 2);
        assert!(result.is_empty());
    }

    #[test]
    fn no_duplicate_combinations() {
        let result = k_combinations(&[1, 2, 3, 4, 5], 3);
        let unique: HashSet<Vec<i32>> = result
            .iter()
            .map(|subset| {
                let mut sorted = subset.clone();
                sorted.sort();
                sorted
            })
            .collect();
        assert_eq!(unique.len(), result.len());
    }

    #[test]
    fn each_subset_contains_only_input_elements() {
        let input = vec![10, 20, 30, 40];
        let result = k_combinations(&input, 2);
        for subset in &result {
            for &value in subset {
                assert!(input.contains(&value));
            }
        }
    }
}
