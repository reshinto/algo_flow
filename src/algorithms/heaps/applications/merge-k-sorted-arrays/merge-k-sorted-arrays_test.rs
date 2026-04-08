include!("sources/merge-k-sorted-arrays.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let result = merge_k_sorted_arrays(&[vec![1,4,7], vec![2,5,8], vec![3,6,9]]);
        assert_eq!(result, vec![1,2,3,4,5,6,7,8,9]);
    }

    #[test]
    fn test_unequal_lengths() {
        let result = merge_k_sorted_arrays(&[vec![1], vec![2,3,4], vec![5,6]]);
        assert_eq!(result, vec![1,2,3,4,5,6]);
    }

    #[test]
    fn test_single_array() {
        let result = merge_k_sorted_arrays(&[vec![1,2,3]]);
        assert_eq!(result, vec![1,2,3]);
    }

    #[test]
    fn test_two_arrays() {
        let result = merge_k_sorted_arrays(&[vec![1,3,5], vec![2,4,6]]);
        assert_eq!(result, vec![1,2,3,4,5,6]);
    }

    #[test]
    fn test_single_element_arrays() {
        let result = merge_k_sorted_arrays(&[vec![3], vec![1], vec![2]]);
        assert_eq!(result, vec![1,2,3]);
    }

    #[test]
    fn test_duplicates() {
        let result = merge_k_sorted_arrays(&[vec![1,3,3], vec![2,3,4]]);
        assert_eq!(result, vec![1,2,3,3,3,4]);
    }

    #[test]
    fn test_negative_numbers() {
        let result = merge_k_sorted_arrays(&[vec![-3,-1,0], vec![-2,1,2]]);
        assert_eq!(result, vec![-3,-2,-1,0,1,2]);
    }

    #[test]
    fn test_sorted_ascending() {
        let result = merge_k_sorted_arrays(&[vec![5,10], vec![1,7], vec![3,8]]);
        for idx in 0..result.len()-1 {
            assert!(result[idx] <= result[idx+1]);
        }
    }
}
