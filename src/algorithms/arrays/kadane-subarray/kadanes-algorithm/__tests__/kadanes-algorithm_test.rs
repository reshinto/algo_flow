include!("../sources/kadanes-algorithm.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mixed_array() {
        let (max_sum, start_index, end_index) = kadanes_algorithm(&[-2, 1, -3, 4, -1, 2, 1, -5, 4]);
        assert_eq!(max_sum, 6);
        assert_eq!(start_index, 3);
        assert_eq!(end_index, 6);
    }

    #[test]
    fn test_all_positive() {
        let (max_sum, start_index, end_index) = kadanes_algorithm(&[1, 2, 3, 4, 5]);
        assert_eq!(max_sum, 15);
        assert_eq!(start_index, 0);
        assert_eq!(end_index, 4);
    }

    #[test]
    fn test_all_negative() {
        let (max_sum, start_index, end_index) = kadanes_algorithm(&[-5, -3, -8, -1, -4]);
        assert_eq!(max_sum, -1);
        assert_eq!(start_index, 3);
        assert_eq!(end_index, 3);
    }

    #[test]
    fn test_single_element() {
        let (max_sum, start_index, end_index) = kadanes_algorithm(&[42]);
        assert_eq!(max_sum, 42);
        assert_eq!(start_index, 0);
        assert_eq!(end_index, 0);
    }

    #[test]
    fn test_empty_array() {
        let (max_sum, start_index, end_index) = kadanes_algorithm(&[]);
        assert_eq!(max_sum, 0);
        assert_eq!(start_index, -1);
        assert_eq!(end_index, -1);
    }

    #[test]
    fn test_all_identical() {
        let (max_sum, start_index, end_index) = kadanes_algorithm(&[3, 3, 3, 3]);
        assert_eq!(max_sum, 12);
        assert_eq!(start_index, 0);
        assert_eq!(end_index, 3);
    }

    #[test]
    fn test_max_at_start() {
        let (max_sum, start_index, end_index) = kadanes_algorithm(&[10, 9, -100, 1, 2]);
        assert_eq!(max_sum, 19);
        assert_eq!(start_index, 0);
        assert_eq!(end_index, 1);
    }

    #[test]
    fn test_max_at_end() {
        let (max_sum, start_index, end_index) = kadanes_algorithm(&[1, -100, 8, 9, 10]);
        assert_eq!(max_sum, 27);
        assert_eq!(start_index, 2);
        assert_eq!(end_index, 4);
    }
}
