include!("../sources/product-except-self.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_four_element() {
        assert_eq!(product_except_self(&[1, 2, 3, 4]), vec![24, 12, 8, 6]);
    }

    #[test]
    fn test_default_five_element() {
        assert_eq!(product_except_self(&[1, 2, 3, 4, 5]), vec![120, 60, 40, 30, 24]);
    }

    #[test]
    fn test_single_zero() {
        assert_eq!(product_except_self(&[1, 0, 3]), vec![0, 3, 0]);
    }

    #[test]
    fn test_two_zeros() {
        assert_eq!(product_except_self(&[0, 1, 0]), vec![0, 0, 0]);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(product_except_self(&[5]), vec![1]);
    }

    #[test]
    fn test_empty_array() {
        assert_eq!(product_except_self(&[]), vec![]);
    }

    #[test]
    fn test_all_ones() {
        assert_eq!(product_except_self(&[1, 1, 1]), vec![1, 1, 1]);
    }

    #[test]
    fn test_negative_numbers() {
        assert_eq!(product_except_self(&[-1, 2, -3]), vec![-6, 3, -2]);
    }
}
