include!("heap-increase-key.rs");

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
        let result = heap_increase_key(&[1,3,5,7,9,8,6], 1, 10);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_new_value_present() {
        let result = heap_increase_key(&[1,3,5,7,9,8,6], 1, 10);
        assert!(result.contains(&10));
        assert!(!result.contains(&3));
    }

    #[test]
    fn test_no_sift_needed() {
        let result = heap_increase_key(&[1,3,5,7,9,8,6], 1, 5);
        assert!(is_min_heap(&result));
        assert_eq!(result[1], 5);
    }

    #[test]
    fn test_increase_root_sifts_down() {
        let result = heap_increase_key(&[1,3,5,7,9,8,6], 0, 20);
        assert!(is_min_heap(&result));
        assert_ne!(result[0], 20);
    }

    #[test]
    fn test_increase_leaf() {
        let result = heap_increase_key(&[1,3,5,7,9,8,6], 6, 100);
        assert!(is_min_heap(&result));
        assert!(result.contains(&100));
    }

    #[test]
    fn test_single_element() {
        assert_eq!(heap_increase_key(&[5], 0, 10), vec![10]);
    }
}
