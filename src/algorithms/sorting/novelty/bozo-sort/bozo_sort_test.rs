include!("sources/bozo-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_small_array_using_seeded_prng() {
        assert_eq!(bozo_sort(&[3, 1, 2]), vec![1, 2, 3]);
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(bozo_sort(&[1, 2, 3]), vec![1, 2, 3]);
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(bozo_sort(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(bozo_sort(&[]), vec![]);
    }

    #[test]
    fn produces_result_with_same_length_as_input() {
        assert_eq!(bozo_sort(&[3, 1, 2]).len(), 3);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![3, 1, 2];
        let sorted = bozo_sort(&original);
        assert_eq!(sorted, vec![1, 2, 3]);
        assert_eq!(original, vec![3, 1, 2]);
    }

    #[test]
    fn handles_2_element_array() {
        assert_eq!(bozo_sort(&[2, 1]), vec![1, 2]);
    }
}
