include!("../sources/find-all-duplicates.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_2_3_for_default() {
        assert_eq!(find_all_duplicates(&[4, 3, 2, 7, 8, 2, 3, 1]), vec![2, 3]);
    }

    #[test]
    fn test_returns_1_for_1_1_2() {
        assert_eq!(find_all_duplicates(&[1, 1, 2]), vec![1]);
    }

    #[test]
    fn test_returns_empty_for_no_duplicates() {
        assert_eq!(find_all_duplicates(&[1, 2, 3]), Vec::<i32>::new());
    }

    #[test]
    fn test_returns_empty_for_empty_array() {
        assert_eq!(find_all_duplicates(&[]), Vec::<i32>::new());
    }

    #[test]
    fn test_returns_5_for_5_5() {
        assert_eq!(find_all_duplicates(&[5, 5]), vec![5]);
    }

    #[test]
    fn test_returns_1_2_for_1_2_1_2() {
        assert_eq!(find_all_duplicates(&[1, 2, 1, 2]), vec![1, 2]);
    }

    #[test]
    fn test_returns_empty_for_single_element() {
        assert_eq!(find_all_duplicates(&[7]), Vec::<i32>::new());
    }

    #[test]
    fn test_handles_all_same_elements() {
        assert_eq!(find_all_duplicates(&[3, 3, 3]), vec![3, 3]);
    }
}
