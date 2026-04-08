include!("sources/lomuto-partition.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input_pivot_at_correct_position() {
        let (pivot_index, result) = lomuto_partition(&[8, 3, 6, 1, 5, 9, 2, 7]);
        assert!(pivot_index >= 0);
        let pivot_idx = pivot_index as usize;
        assert_eq!(result[pivot_idx], 7);
        for left_val in &result[..pivot_idx] {
            assert!(*left_val <= 7);
        }
        for right_val in &result[pivot_idx + 1..] {
            assert!(*right_val > 7);
        }
    }

    #[test]
    fn test_sorted_array_pivot_at_last() {
        let (pivot_index, result) = lomuto_partition(&[1, 2, 3, 4, 5]);
        assert_eq!(pivot_index, 4);
        assert_eq!(result[4], 5);
    }

    #[test]
    fn test_reverse_sorted_pivot_at_first() {
        let (pivot_index, result) = lomuto_partition(&[5, 4, 3, 2, 1]);
        assert_eq!(pivot_index, 0);
        assert_eq!(result[0], 1);
    }

    #[test]
    fn test_single_element() {
        let (pivot_index, result) = lomuto_partition(&[42]);
        assert_eq!(pivot_index, 0);
        assert_eq!(result, vec![42]);
    }

    #[test]
    fn test_empty_array() {
        let (pivot_index, result) = lomuto_partition(&[]);
        assert_eq!(pivot_index, -1);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_two_elements_larger_first() {
        let (pivot_index, result) = lomuto_partition(&[5, 2]);
        assert_eq!(pivot_index, 0);
        assert_eq!(result[0], 2);
        assert_eq!(result[1], 5);
    }

    #[test]
    fn test_does_not_mutate_original() {
        let original = vec![8, 3, 6, 1, 5, 9, 2, 7];
        let _ = lomuto_partition(&original);
        assert_eq!(original, vec![8, 3, 6, 1, 5, 9, 2, 7]);
    }
}
