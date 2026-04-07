include!("max-product-subarray.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let (max_product, _, _) = max_product_subarray(&[2, 3, -2, 4, -1, 2]);
        assert_eq!(max_product, 96);
    }

    #[test]
    fn test_all_positive() {
        let (max_product, _, _) = max_product_subarray(&[1, 2, 3, 4]);
        assert_eq!(max_product, 24);
    }

    #[test]
    fn test_with_zero() {
        let (max_product, _, _) = max_product_subarray(&[2, 3, 0, 4, 5]);
        assert_eq!(max_product, 20);
    }

    #[test]
    fn test_single_element() {
        let (max_product, start, end) = max_product_subarray(&[7]);
        assert_eq!(max_product, 7);
        assert_eq!(start, 0);
        assert_eq!(end, 0);
    }

    #[test]
    fn test_two_negatives() {
        let (max_product, _, _) = max_product_subarray(&[-2, -3]);
        assert_eq!(max_product, 6);
    }

    #[test]
    fn test_negative_flip() {
        let (max_product, _, _) = max_product_subarray(&[-2, 3, -4]);
        assert_eq!(max_product, 24);
    }

    #[test]
    fn test_empty_array() {
        let (max_product, _, _) = max_product_subarray(&[]);
        assert_eq!(max_product, 0);
    }

    #[test]
    fn test_valid_indices() {
        let input_array = [2, 3, -2, 4, -1, 2];
        let (_, start, end) = max_product_subarray(&input_array);
        assert!(start <= end);
        assert!(end < input_array.len());
    }
}
