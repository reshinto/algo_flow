include!("../sources/heap-extract-min.rs");

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
    fn test_extracts_minimum() {
        let (extracted, _) = heap_extract_min(&[1,3,5,7,9,8,6]);
        assert_eq!(extracted, 1);
    }

    #[test]
    fn test_remaining_valid_min_heap() {
        let (_, remaining) = heap_extract_min(&[1,3,5,7,9,8,6]);
        assert!(is_min_heap(&remaining));
    }

    #[test]
    fn test_remaining_length() {
        let (_, remaining) = heap_extract_min(&[1,3,5,7,9,8,6]);
        assert_eq!(remaining.len(), 6);
    }

    #[test]
    fn test_new_root_is_second_smallest() {
        let (_, remaining) = heap_extract_min(&[1,3,5,7,9,8,6]);
        assert_eq!(remaining[0], 3);
    }

    #[test]
    fn test_two_element() {
        let (extracted, remaining) = heap_extract_min(&[2,5]);
        assert_eq!(extracted, 2);
        assert_eq!(remaining, vec![5]);
    }

    #[test]
    fn test_single_element() {
        let (extracted, remaining) = heap_extract_min(&[42]);
        assert_eq!(extracted, 42);
        assert_eq!(remaining, Vec::<i64>::new());
    }
}
