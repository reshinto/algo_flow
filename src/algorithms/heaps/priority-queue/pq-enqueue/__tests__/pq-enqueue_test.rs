include!("../sources/pq-enqueue.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn is_min_heap(array: &[i64]) -> bool {
        let size = array.len();
        for parent_idx in 0..size / 2 {
            let left_idx = 2 * parent_idx + 1;
            let right_idx = 2 * parent_idx + 2;
            if left_idx < size && array[parent_idx] > array[left_idx] {
                return false;
            }
            if right_idx < size && array[parent_idx] > array[right_idx] {
                return false;
            }
        }
        true
    }

    #[test]
    fn test_enqueue_into_empty() {
        let result = pq_enqueue(&[], 5);
        assert_eq!(result, vec![5]);
    }

    #[test]
    fn test_enqueue_larger_value() {
        let result = pq_enqueue(&[1, 3, 5, 7, 9, 8, 6], 10);
        assert!(is_min_heap(&result));
        assert_eq!(result.len(), 8);
        assert!(result.contains(&10));
    }

    #[test]
    fn test_enqueue_smaller_value_bubbles_to_root() {
        let result = pq_enqueue(&[1, 3, 5, 7, 9, 8, 6], 0);
        assert!(is_min_heap(&result));
        assert_eq!(result[0], 0);
    }

    #[test]
    fn test_enqueue_new_minimum() {
        let result = pq_enqueue(&[2, 5, 3, 10, 15, 8, 7], 1);
        assert!(is_min_heap(&result));
        assert_eq!(result[0], 1);
    }

    #[test]
    fn test_preserves_length_increment() {
        let original = vec![1i64, 3, 5, 7, 9, 8, 6];
        let result = pq_enqueue(&original, 4);
        assert_eq!(result.len(), original.len() + 1);
    }

    #[test]
    fn test_all_elements_present() {
        let original = vec![1i64, 3, 5, 7, 9, 8, 6];
        let mut result = pq_enqueue(&original, 4);
        result.sort();
        let mut expected = original.clone();
        expected.push(4);
        expected.sort();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_single_element_enqueue_smaller() {
        let result = pq_enqueue(&[5], 2);
        assert_eq!(result.len(), 2);
        assert_eq!(result[0], 2);
    }

    #[test]
    fn test_enqueue_duplicate() {
        let result = pq_enqueue(&[1, 3, 5], 3);
        assert!(is_min_heap(&result));
        assert_eq!(result.iter().filter(|&&val| val == 3).count(), 2);
    }
}
