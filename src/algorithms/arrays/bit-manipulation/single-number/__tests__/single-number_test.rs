include!("../sources/single-number.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_array() {
        assert_eq!(single_number(&[4, 1, 2, 1, 2]), 4);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(single_number(&[42]), 42);
    }

    #[test]
    fn test_unique_at_end() {
        assert_eq!(single_number(&[1, 1, 2, 2, 3]), 3);
    }

    #[test]
    fn test_unique_at_start() {
        assert_eq!(single_number(&[5, 3, 3, 7, 7]), 5);
    }

    #[test]
    fn test_empty_array() {
        assert_eq!(single_number(&[]), 0);
    }

    #[test]
    fn test_negative_numbers() {
        assert_eq!(single_number(&[-1, 2, -1]), 2);
    }

    #[test]
    fn test_larger_array() {
        assert_eq!(single_number(&[1, 2, 3, 4, 5, 99, 5, 4, 3, 2, 1]), 99);
    }

    #[test]
    fn test_unique_zero() {
        assert_eq!(single_number(&[1, 2, 1, 2, 0]), 0);
    }
}
