include!("power-set.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashSet;

    #[test]
    fn generates_2_to_n_subsets() {
        let result = power_set(&[1, 2, 3, 4]);
        assert_eq!(result.len(), 16);
    }

    #[test]
    fn includes_empty_set() {
        let result = power_set(&[1, 2, 3]);
        assert!(result.iter().any(|subset| subset.is_empty()));
    }

    #[test]
    fn includes_full_set() {
        let result = power_set(&[1, 2, 3]);
        assert!(result.iter().any(|subset| {
            let mut sorted = subset.clone();
            sorted.sort();
            sorted == vec![1, 2, 3]
        }));
    }

    #[test]
    fn empty_input_returns_one_empty_subset() {
        let result = power_set(&[]);
        assert_eq!(result.len(), 1);
        assert!(result[0].is_empty());
    }

    #[test]
    fn single_element_returns_two_subsets() {
        let result = power_set(&[7]);
        assert_eq!(result.len(), 2);
    }

    #[test]
    fn two_elements_returns_four_subsets() {
        let result = power_set(&[1, 2]);
        assert_eq!(result.len(), 4);
    }

    #[test]
    fn three_elements_returns_eight_subsets() {
        let result = power_set(&[1, 2, 3]);
        assert_eq!(result.len(), 8);
    }

    #[test]
    fn no_duplicate_subsets() {
        let result = power_set(&[1, 2, 3, 4]);
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
        let input = vec![5, 10, 15];
        let result = power_set(&input);
        for subset in &result {
            for &value in subset {
                assert!(input.contains(&value));
            }
        }
    }
}
