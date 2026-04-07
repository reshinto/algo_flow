include!("two-pointer-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_sorted_array() {
        let (found, left_index, right_index) =
            two_pointer_sum(&[1, 2, 4, 6, 8, 11, 15], 10);
        assert_eq!(found, true);
        assert_eq!(left_index, 1);
        assert_eq!(right_index, 4);
    }

    #[test]
    fn test_pair_at_outermost_positions() {
        let (found, left_index, right_index) = two_pointer_sum(&[1, 2, 3, 4, 5], 6);
        assert_eq!(found, true);
        assert_eq!(left_index, 0);
        assert_eq!(right_index, 4);
    }

    #[test]
    fn test_not_found() {
        let (found, left_index, right_index) = two_pointer_sum(&[1, 3, 5, 7], 2);
        assert_eq!(found, false);
        assert_eq!(left_index, -1);
        assert_eq!(right_index, -1);
    }

    #[test]
    fn test_single_element() {
        let (found, _, _) = two_pointer_sum(&[5], 10);
        assert_eq!(found, false);
    }

    #[test]
    fn test_empty_array() {
        let (found, _, _) = two_pointer_sum(&[], 10);
        assert_eq!(found, false);
    }

    #[test]
    fn test_all_identical_elements_match() {
        let (found, _, _) = two_pointer_sum(&[5, 5, 5, 5], 10);
        assert_eq!(found, true);
    }

    #[test]
    fn test_all_identical_elements_no_match() {
        let (found, _, _) = two_pointer_sum(&[3, 3, 3, 3], 10);
        assert_eq!(found, false);
    }

    #[test]
    fn test_negative_numbers() {
        let (found, left_index, right_index) = two_pointer_sum(&[-3, -1, 0, 2, 4], 1);
        assert_eq!(found, true);
        assert_eq!(left_index, 0);
        assert_eq!(right_index, 4);
    }
}
