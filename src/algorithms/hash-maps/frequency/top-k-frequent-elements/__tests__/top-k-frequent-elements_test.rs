include!("../sources/top-k-frequent-elements.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_top_2_from_default() {
        let result = top_k_frequent_elements(&[1, 1, 1, 2, 2, 3], 2);
        assert_eq!(result.len(), 2);
        assert!(result.contains(&1));
        assert!(result.contains(&2));
    }

    #[test]
    fn test_returns_single_top_element_when_k_equals_1() {
        let result = top_k_frequent_elements(&[1, 1, 2, 2, 2, 3], 1);
        assert_eq!(result.len(), 1);
        assert_eq!(result[0], 2);
    }

    #[test]
    fn test_returns_all_elements_when_k_equals_unique_count() {
        let result = top_k_frequent_elements(&[1, 2, 3], 3);
        assert_eq!(result.len(), 3);
        assert!(result.contains(&1));
        assert!(result.contains(&2));
        assert!(result.contains(&3));
    }

    #[test]
    fn test_handles_all_same_elements() {
        let result = top_k_frequent_elements(&[7, 7, 7, 7], 1);
        assert_eq!(result, vec![7]);
    }

    #[test]
    fn test_returns_correct_top_k_with_clear_winner() {
        let result = top_k_frequent_elements(&[4, 4, 4, 4, 5, 5, 6], 2);
        assert_eq!(result.len(), 2);
        assert!(result.contains(&4));
        assert!(result.contains(&5));
    }

    #[test]
    fn test_handles_negative_numbers() {
        let result = top_k_frequent_elements(&[-1, -1, -2, -2, -2, 3], 2);
        assert_eq!(result.len(), 2);
        assert!(result.contains(&-2));
        assert!(result.contains(&-1));
    }

    #[test]
    fn test_returns_exactly_k_elements() {
        let result = top_k_frequent_elements(&[1, 2, 3, 4, 5], 2);
        assert_eq!(result.len(), 2);
    }
}
