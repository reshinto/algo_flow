include!("../sources/heap-replace-root.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn is_min_heap(array: &[i64]) -> bool {
        let size = array.len();
        for parent_idx in 0..size/2 {
            let left_idx = 2 * parent_idx + 1;
            let right_idx = 2 * parent_idx + 2;
            if left_idx < size && array[parent_idx] > array[left_idx] { return false; }
            if right_idx < size && array[parent_idx] > array[right_idx] { return false; }
        }
        true
    }

    #[test]
    fn test_returns_replaced_value() {
        let (replaced, _) = heap_replace_root(&[1,3,5,7,9,8,6], 10);
        assert_eq!(replaced, 1);
    }

    #[test]
    fn test_valid_min_heap() {
        let (_, new_heap) = heap_replace_root(&[1,3,5,7,9,8,6], 10);
        assert!(is_min_heap(&new_heap));
    }

    #[test]
    fn test_new_value_in_heap() {
        let (_, new_heap) = heap_replace_root(&[1,3,5,7,9,8,6], 10);
        assert!(new_heap.contains(&10));
        assert!(!new_heap.contains(&1));
    }

    #[test]
    fn test_small_value_stays_at_root() {
        let (replaced, new_heap) = heap_replace_root(&[1,3,5,7,9,8,6], 2);
        assert_eq!(replaced, 1);
        assert_eq!(new_heap[0], 2);
    }

    #[test]
    fn test_large_value_sinks() {
        let (_, new_heap) = heap_replace_root(&[1,3,5,7,9,8,6], 100);
        assert!(is_min_heap(&new_heap));
        assert_ne!(new_heap[0], 100);
    }

    #[test]
    fn test_single_element() {
        let (replaced, new_heap) = heap_replace_root(&[42], 7);
        assert_eq!(replaced, 42);
        assert_eq!(new_heap, vec![7]);
    }

    #[test]
    fn test_two_element() {
        let (replaced, new_heap) = heap_replace_root(&[1,5], 10);
        assert_eq!(replaced, 1);
        assert!(is_min_heap(&new_heap));
    }
}
