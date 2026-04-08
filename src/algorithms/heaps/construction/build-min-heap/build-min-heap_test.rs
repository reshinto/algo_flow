include!("sources/build-min-heap.rs");

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
        let result = build_min_heap(&[9,5,7,1,3,8,2,6,4]);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_root_is_minimum() {
        let result = build_min_heap(&[9,5,7,1,3,8,2,6,4]);
        assert_eq!(result[0], 1);
    }

    #[test]
    fn test_already_valid_min_heap() {
        let result = build_min_heap(&[1,3,2,7,5,8,4]);
        assert!(is_min_heap(&result));
        assert_eq!(result[0], 1);
    }

    #[test]
    fn test_reverse_sorted() {
        let result = build_min_heap(&[7,6,5,4,3,2,1]);
        assert!(is_min_heap(&result));
        assert_eq!(result[0], 1);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(build_min_heap(&[42]), vec![42]);
    }

    #[test]
    fn test_two_elements() {
        let result = build_min_heap(&[5,2]);
        assert_eq!(result[0], 2);
        assert!(is_min_heap(&result));
    }
}
