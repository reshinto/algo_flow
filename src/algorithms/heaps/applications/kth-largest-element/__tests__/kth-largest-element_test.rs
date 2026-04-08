include!("../sources/kth-largest-element.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_3rd_largest() {
        assert_eq!(kth_largest_element(&[3, 1, 5, 12, 2, 11, 7, 9], 3), 9);
    }

    #[test]
    fn test_1st_largest() {
        assert_eq!(kth_largest_element(&[3, 1, 5, 12, 2, 11, 7, 9], 1), 12);
    }

    #[test]
    fn test_last_largest() {
        assert_eq!(kth_largest_element(&[3, 1, 5, 12, 2, 11, 7, 9], 8), 1);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(kth_largest_element(&[42], 1), 42);
    }

    #[test]
    fn test_duplicates() {
        assert_eq!(kth_largest_element(&[5, 5, 5, 5], 2), 5);
    }

    #[test]
    fn test_negative_values() {
        assert_eq!(kth_largest_element(&[-1, -5, -3, -2, -4], 2), -2);
    }

    #[test]
    fn test_two_elements() {
        assert_eq!(kth_largest_element(&[10, 20], 2), 10);
    }

    #[test]
    fn test_2nd_largest() {
        assert_eq!(kth_largest_element(&[7, 10, 4, 3, 20, 15, 8], 2), 15);
    }
}
