include!("sources/difference-array.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_single_range_update() {
        assert_eq!(difference_array(5, &[[1, 3, 3]]), vec![0, 3, 3, 3, 0]);
    }

    #[test]
    fn test_overlapping_updates() {
        assert_eq!(difference_array(5, &[[0, 4, 1], [1, 3, 2]]), vec![1, 3, 3, 3, 1]);
    }

    #[test]
    fn test_full_range_update() {
        assert_eq!(difference_array(4, &[[0, 3, 5]]), vec![5, 5, 5, 5]);
    }

    #[test]
    fn test_single_element_update() {
        assert_eq!(difference_array(4, &[[2, 2, 7]]), vec![0, 0, 7, 0]);
    }

    #[test]
    fn test_no_updates() {
        assert_eq!(difference_array(5, &[]), vec![0, 0, 0, 0, 0]);
    }

    #[test]
    fn test_negative_delta() {
        assert_eq!(difference_array(5, &[[1, 3, -4]]), vec![0, -4, -4, -4, 0]);
    }

    #[test]
    fn test_default_input() {
        assert_eq!(
            difference_array(8, &[[1, 4, 3], [2, 6, -1], [0, 3, 2]]),
            vec![2, 5, 4, 4, 2, -1, -1, 0]
        );
    }
}
