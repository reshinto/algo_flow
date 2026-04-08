include!("sources/pairwise-sorting-network.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_unsorted_array() {
        assert_eq!(
            pairwise_sorting_network(&[5, 3, 8, 1, 4, 2, 7, 6]),
            vec![1, 2, 3, 4, 5, 6, 7, 8]
        );
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(pairwise_sorting_network(&[1, 2, 3, 4]), vec![1, 2, 3, 4]);
    }

    #[test]
    fn handles_reverse_sorted_array() {
        assert_eq!(pairwise_sorting_network(&[4, 3, 2, 1]), vec![1, 2, 3, 4]);
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(pairwise_sorting_network(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(pairwise_sorting_network(&[]), vec![]);
    }

    #[test]
    fn handles_array_with_negative_numbers() {
        assert_eq!(pairwise_sorting_network(&[3, -1, 0, -5, 2]), vec![-5, -1, 0, 2, 3]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![4, 2, 3, 1];
        let sorted = pairwise_sorting_network(&original);
        assert_eq!(sorted, vec![1, 2, 3, 4]);
        assert_eq!(original, vec![4, 2, 3, 1]);
    }
}
