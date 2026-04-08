include!("../sources/subarray-product-less-than-k.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let result = subarray_product_less_than_k(&[10, 5, 2, 6, 1, 3], 100);
        assert_eq!(result, 16);
    }

    #[test]
    fn test_threshold_zero() {
        let result = subarray_product_less_than_k(&[1, 2, 3], 0);
        assert_eq!(result, 0);
    }

    #[test]
    fn test_threshold_one() {
        let result = subarray_product_less_than_k(&[1, 2, 3], 1);
        assert_eq!(result, 0);
    }

    #[test]
    fn test_empty_array() {
        let result = subarray_product_less_than_k(&[], 100);
        assert_eq!(result, 0);
    }

    #[test]
    fn test_threshold_filters_multi_element() {
        let result = subarray_product_less_than_k(&[1, 2, 3, 4], 5);
        assert_eq!(result, 5);
    }

    #[test]
    fn test_all_ones() {
        let result = subarray_product_less_than_k(&[1, 1, 1], 2);
        assert_eq!(result, 6);
    }

    #[test]
    fn test_single_element_below_threshold() {
        let result = subarray_product_less_than_k(&[5], 10);
        assert_eq!(result, 1);
    }

    #[test]
    fn test_single_element_at_threshold() {
        let result = subarray_product_less_than_k(&[10], 10);
        assert_eq!(result, 0);
    }

    #[test]
    fn test_large_threshold_all_qualify() {
        let result = subarray_product_less_than_k(&[1, 2, 3], 1000);
        assert_eq!(result, 6);
    }
}
