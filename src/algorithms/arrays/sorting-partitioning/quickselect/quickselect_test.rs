include!("sources/quickselect.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_fourth_smallest() {
        let (kth_element, _) = quickselect(&[7, 2, 1, 6, 8, 5, 3, 4], 4);
        assert_eq!(kth_element, 4);
    }

    #[test]
    fn test_minimum() {
        let (kth_element, _) = quickselect(&[7, 2, 1, 6, 8, 5, 3, 4], 1);
        assert_eq!(kth_element, 1);
    }

    #[test]
    fn test_maximum() {
        let (kth_element, _) = quickselect(&[7, 2, 1, 6, 8, 5, 3, 4], 8);
        assert_eq!(kth_element, 8);
    }

    #[test]
    fn test_single_element() {
        let (kth_element, _) = quickselect(&[42], 1);
        assert_eq!(kth_element, 42);
    }

    #[test]
    fn test_invalid_k_zero() {
        let (kth_element, _) = quickselect(&[1, 2, 3], 0);
        assert_eq!(kth_element, -1);
    }

    #[test]
    fn test_invalid_k_too_large() {
        let (kth_element, _) = quickselect(&[1, 2, 3], 5);
        assert_eq!(kth_element, -1);
    }

    #[test]
    fn test_empty_array() {
        let (kth_element, _) = quickselect(&[], 1);
        assert_eq!(kth_element, -1);
    }

    #[test]
    fn test_duplicates() {
        let (kth_element, _) = quickselect(&[3, 3, 1, 2], 2);
        assert_eq!(kth_element, 2);
    }

    #[test]
    fn test_median() {
        let (kth_element, _) = quickselect(&[3, 1, 4, 1, 5, 9, 2, 6, 5], 5);
        assert_eq!(kth_element, 4);
    }
}
