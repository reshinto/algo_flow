include!("sources/heap-extract-max.rs");

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
    fn test_extracts_maximum() {
        let (extracted, _) = heap_extract_max(&[9,7,8,3,5,6,1]);
        assert_eq!(extracted, 9);
    }

    #[test]
    fn test_remaining_valid_max_heap() {
        let (_, remaining) = heap_extract_max(&[9,7,8,3,5,6,1]);
        assert!(is_max_heap(&remaining));
    }

    #[test]
    fn test_remaining_length() {
        let (_, remaining) = heap_extract_max(&[9,7,8,3,5,6,1]);
        assert_eq!(remaining.len(), 6);
    }

    #[test]
    fn test_new_root_is_second_largest() {
        let (_, remaining) = heap_extract_max(&[9,7,8,3,5,6,1]);
        assert_eq!(remaining[0], 8);
    }

    #[test]
    fn test_two_element() {
        let (extracted, remaining) = heap_extract_max(&[8,3]);
        assert_eq!(extracted, 8);
        assert_eq!(remaining, vec![3]);
    }

    #[test]
    fn test_single_element() {
        let (extracted, remaining) = heap_extract_max(&[99]);
        assert_eq!(extracted, 99);
        assert_eq!(remaining, Vec::<i64>::new());
    }
}
