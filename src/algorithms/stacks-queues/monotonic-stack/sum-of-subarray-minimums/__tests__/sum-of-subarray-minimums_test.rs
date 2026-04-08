include!("../sources/sum-of-subarray-minimums.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_17_for_3_1_2_4() {
        assert_eq!(sum_of_subarray_minimums(&[3, 1, 2, 4]), 17);
    }

    #[test]
    fn returns_444_for_leetcode_example() {
        assert_eq!(sum_of_subarray_minimums(&[11, 81, 94, 43, 3]), 444);
    }

    #[test]
    fn single_element() {
        assert_eq!(sum_of_subarray_minimums(&[5]), 5);
    }

    #[test]
    fn all_equal_elements() {
        assert_eq!(sum_of_subarray_minimums(&[2, 2, 2]), 12);
    }

    #[test]
    fn strictly_increasing() {
        assert_eq!(sum_of_subarray_minimums(&[1, 2, 3]), 10);
    }

    #[test]
    fn strictly_decreasing() {
        assert_eq!(sum_of_subarray_minimums(&[3, 2, 1]), 10);
    }

    #[test]
    fn duplicate_values() {
        assert_eq!(sum_of_subarray_minimums(&[1, 1]), 3);
    }

    #[test]
    fn large_values_modulo() {
        let large_array: Vec<i64> = vec![30000; 100];
        let result = sum_of_subarray_minimums(&large_array);
        assert!(result >= 0 && result < 1_000_000_007);
    }
}
