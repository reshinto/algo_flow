include!("../sources/set-permutations.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashSet;

    #[test]
    fn generates_6_permutations_for_3_elements() {
        let result = set_permutations(&[1, 2, 3]);
        assert_eq!(result.len(), 6);
    }

    #[test]
    fn contains_all_expected_permutations() {
        let result = set_permutations(&[1, 2, 3]);
        let serialized: HashSet<String> = result
            .iter()
            .map(|perm| perm.iter().map(|v| v.to_string()).collect::<Vec<_>>().join(","))
            .collect();
        assert!(serialized.contains("1,2,3"));
        assert!(serialized.contains("1,3,2"));
        assert!(serialized.contains("2,1,3"));
        assert!(serialized.contains("2,3,1"));
        assert!(serialized.contains("3,1,2"));
        assert!(serialized.contains("3,2,1"));
    }

    #[test]
    fn two_elements_generates_two_permutations() {
        let result = set_permutations(&[1, 2]);
        assert_eq!(result.len(), 2);
    }

    #[test]
    fn single_element_generates_one_permutation() {
        let result = set_permutations(&[42]);
        assert_eq!(result.len(), 1);
        assert_eq!(result[0], vec![42]);
    }

    #[test]
    fn empty_array_generates_one_permutation() {
        let result = set_permutations(&[]);
        assert_eq!(result.len(), 1);
        assert!(result[0].is_empty());
    }

    #[test]
    fn each_permutation_has_same_length() {
        let result = set_permutations(&[1, 2, 3]);
        for perm in &result {
            assert_eq!(perm.len(), 3);
        }
    }

    #[test]
    fn generates_24_permutations_for_4_elements() {
        let result = set_permutations(&[1, 2, 3, 4]);
        assert_eq!(result.len(), 24);
    }

    #[test]
    fn all_permutations_are_distinct() {
        let result = set_permutations(&[1, 2, 3]);
        let unique: HashSet<Vec<i32>> = result.into_iter().collect();
        assert_eq!(unique.len(), 6);
    }
}
