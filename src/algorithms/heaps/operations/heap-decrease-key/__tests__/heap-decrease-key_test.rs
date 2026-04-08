include!("../sources/heap-decrease-key.rs");

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
    fn test_valid_min_heap() {
        let result = heap_decrease_key(&[1,5,3,7,9,8,6], 3, 2);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_new_value_present() {
        let result = heap_decrease_key(&[1,5,3,7,9,8,6], 3, 2);
        assert!(result.contains(&2));
        assert!(!result.contains(&7));
    }

    #[test]
    fn test_no_sift_needed() {
        let result = heap_decrease_key(&[1,5,3,7,9,8,6], 3, 6);
        assert!(is_min_heap(&result));
        assert_eq!(result[3], 6);
    }

    #[test]
    fn test_decrease_at_root() {
        let result = heap_decrease_key(&[1,5,3,7,9,8,6], 0, -1);
        assert!(is_min_heap(&result));
        assert_eq!(result[0], -1);
    }

    #[test]
    fn test_bubbles_to_root() {
        let result = heap_decrease_key(&[1,3,5,7,9,8,6], 6, 0);
        assert!(is_min_heap(&result));
        assert_eq!(result[0], 0);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(heap_decrease_key(&[10], 0, 5), vec![5]);
    }
}
