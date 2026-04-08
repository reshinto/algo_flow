include!("../sources/build-max-heap.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn is_max_heap(array: &[i64]) -> bool {
        let size = array.len();
        for parent_idx in 0..size/2 {
            let left_idx = 2 * parent_idx + 1;
            let right_idx = 2 * parent_idx + 2;
            if left_idx < size && array[parent_idx] < array[left_idx] { return false; }
            if right_idx < size && array[parent_idx] < array[right_idx] { return false; }
        }
        true
    }

    #[test]
    fn test_valid_max_heap() {
        let result = build_max_heap(&[9,5,7,1,3,8,2,6,4]);
        assert!(is_max_heap(&result));
    }

    #[test]
    fn test_root_is_maximum() {
        let result = build_max_heap(&[9,5,7,1,3,8,2,6,4]);
        assert_eq!(result[0], 9);
    }

    #[test]
    fn test_already_valid_max_heap() {
        let result = build_max_heap(&[9,7,8,5,6,3,4]);
        assert!(is_max_heap(&result));
        assert_eq!(result[0], 9);
    }

    #[test]
    fn test_sorted_ascending() {
        let result = build_max_heap(&[1,2,3,4,5,6,7]);
        assert!(is_max_heap(&result));
        assert_eq!(result[0], 7);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(build_max_heap(&[42]), vec![42]);
    }

    #[test]
    fn test_two_elements() {
        let result = build_max_heap(&[2,5]);
        assert_eq!(result[0], 5);
        assert!(is_max_heap(&result));
    }
}
