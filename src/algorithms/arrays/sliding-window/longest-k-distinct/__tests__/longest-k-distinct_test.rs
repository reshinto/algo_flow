include!("../sources/longest-k-distinct.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let (max_length, _) = longest_k_distinct(&[1, 2, 1, 2, 3, 3, 4, 1], 2);
        assert_eq!(max_length, 4);
    }

    #[test]
    fn test_k_equals_one() {
        let (max_length, start_index) = longest_k_distinct(&[1, 2, 2, 3, 3, 3], 1);
        assert_eq!(max_length, 3);
        assert_eq!(start_index, 3);
    }

    #[test]
    fn test_k_gte_distinct() {
        let (max_length, start_index) = longest_k_distinct(&[1, 2, 3], 5);
        assert_eq!(max_length, 3);
        assert_eq!(start_index, 0);
    }

    #[test]
    fn test_all_identical() {
        let (max_length, start_index) = longest_k_distinct(&[2, 2, 2, 2], 2);
        assert_eq!(max_length, 4);
        assert_eq!(start_index, 0);
    }

    #[test]
    fn test_k_zero() {
        let (max_length, _) = longest_k_distinct(&[1, 2, 3], 0);
        assert_eq!(max_length, 0);
    }

    #[test]
    fn test_empty_array() {
        let (max_length, _) = longest_k_distinct(&[], 2);
        assert_eq!(max_length, 0);
    }

    #[test]
    fn test_single_element() {
        let (max_length, start_index) = longest_k_distinct(&[7], 1);
        assert_eq!(max_length, 1);
        assert_eq!(start_index, 0);
    }
}
