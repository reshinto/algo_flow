include!("pq-change-priority.rs");

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
    fn test_decrease_priority_restores_min_heap() {
        let result = pq_change_priority(&[2, 5, 3, 10, 15, 8, 7], 4, 1);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_decrease_priority_new_min_at_root() {
        let result = pq_change_priority(&[2, 5, 3, 10, 15, 8, 7], 4, 1);
        assert_eq!(result[0], 1);
    }

    #[test]
    fn test_increase_priority_restores_min_heap() {
        let result = pq_change_priority(&[2, 5, 3, 10, 15, 8, 7], 0, 20);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_increase_priority_old_root_displaced() {
        let result = pq_change_priority(&[2, 5, 3, 10, 15, 8, 7], 0, 20);
        assert_eq!(result[0], 3);
    }

    #[test]
    fn test_decrease_last_to_new_min() {
        let result = pq_change_priority(&[1, 3, 5, 7, 9, 8, 6], 6, 0);
        assert!(is_min_heap(&result));
        assert_eq!(result[0], 0);
    }

    #[test]
    fn test_increase_last_element() {
        let result = pq_change_priority(&[1, 3, 5, 7, 9], 4, 100);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_same_value_no_change() {
        let result = pq_change_priority(&[2, 5, 3, 10, 15, 8, 7], 2, 3);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_preserves_length() {
        let input = vec![2i64, 5, 3, 10, 15, 8, 7];
        let result = pq_change_priority(&input, 3, 0);
        assert_eq!(result.len(), input.len());
    }

    #[test]
    fn test_single_element() {
        let result = pq_change_priority(&[5], 0, 99);
        assert_eq!(result, vec![99]);
    }
}
