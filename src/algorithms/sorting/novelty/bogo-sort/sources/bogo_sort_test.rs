include!("bogo-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_small_array_using_seeded_prng() {
        assert_eq!(bogo_sort(&[3, 1, 2]), vec![1, 2, 3]);
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(bogo_sort(&[1, 2, 3]), vec![1, 2, 3]);
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(bogo_sort(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(bogo_sort(&[]), vec![]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![3, 1, 2];
        let sorted = bogo_sort(&original);
        assert_eq!(sorted, vec![1, 2, 3]);
        assert_eq!(original, vec![3, 1, 2]);
    }

    #[test]
    fn produces_sorted_result_within_cap() {
        let result = bogo_sort(&[2, 1]);
        assert_eq!(result.len(), 2);
        // With seed 42 and only 2 elements, it should sort quickly
        assert!(result[0] <= result[1]);
    }
}
