include!("sources/pq-dequeue.rs");

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
    fn test_dequeues_minimum() {
        let (dequeued, _) = pq_dequeue(&[1, 3, 5, 7, 9, 8, 6]);
        assert_eq!(dequeued, 1);
    }

    #[test]
    fn test_remaining_is_valid_min_heap() {
        let (_, remaining) = pq_dequeue(&[1, 3, 5, 7, 9, 8, 6]);
        assert!(is_min_heap(&remaining));
    }

    #[test]
    fn test_remaining_length() {
        let (_, remaining) = pq_dequeue(&[1, 3, 5, 7, 9, 8, 6]);
        assert_eq!(remaining.len(), 6);
    }

    #[test]
    fn test_all_elements_accounted() {
        let original = vec![1i64, 3, 5, 7, 9, 8, 6];
        let (dequeued, mut remaining) = pq_dequeue(&original);
        remaining.push(dequeued);
        remaining.sort();
        let mut expected = original.clone();
        expected.sort();
        assert_eq!(remaining, expected);
    }

    #[test]
    fn test_new_root_is_second_smallest() {
        let (_, remaining) = pq_dequeue(&[1, 3, 5, 7, 9, 8, 6]);
        assert_eq!(remaining[0], 3);
    }

    #[test]
    fn test_two_element() {
        let (dequeued, remaining) = pq_dequeue(&[2, 5]);
        assert_eq!(dequeued, 2);
        assert_eq!(remaining, vec![5]);
    }

    #[test]
    fn test_single_element() {
        let (dequeued, remaining) = pq_dequeue(&[42]);
        assert_eq!(dequeued, 42);
        assert!(remaining.is_empty());
    }

    #[test]
    fn test_larger_heap() {
        let (dequeued, remaining) = pq_dequeue(&[2, 5, 3, 10, 15, 8, 7]);
        assert_eq!(dequeued, 2);
        assert!(is_min_heap(&remaining));
    }
}
