include!("../sources/kth-smallest-element.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_3rd_smallest() {
        assert_eq!(kth_smallest_element(&[7, 10, 4, 3, 20, 15, 8], 3), 7);
    }

    #[test]
    fn test_1st_smallest() {
        assert_eq!(kth_smallest_element(&[7, 10, 4, 3, 20, 15, 8], 1), 3);
    }

    #[test]
    fn test_last_smallest() {
        assert_eq!(kth_smallest_element(&[7, 10, 4, 3, 20, 15, 8], 7), 20);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(kth_smallest_element(&[42], 1), 42);
    }

    #[test]
    fn test_duplicates() {
        assert_eq!(kth_smallest_element(&[5, 5, 5, 5], 2), 5);
    }

    #[test]
    fn test_negative_values() {
        assert_eq!(kth_smallest_element(&[-1, -5, -3, -2, -4], 2), -4);
    }

    #[test]
    fn test_two_elements() {
        assert_eq!(kth_smallest_element(&[10, 20], 2), 20);
    }

    #[test]
    fn test_2nd_smallest() {
        assert_eq!(kth_smallest_element(&[7, 10, 4, 3, 20, 15, 8], 2), 4);
    }
}
