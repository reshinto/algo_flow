include!("../sources/heap-insert.rs");

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
    fn test_insert_valid_heap() {
        let result = heap_insert(&[1,3,5,7,9,8,6], 2);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_root_remains_minimum() {
        let result = heap_insert(&[1,3,5,7,9,8,6], 2);
        assert_eq!(result[0], 1);
    }

    #[test]
    fn test_insert_new_minimum() {
        let result = heap_insert(&[3,5,7,9], 1);
        assert_eq!(result[0], 1);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_insert_larger_than_all() {
        let result = heap_insert(&[1,3,5,7], 100);
        assert_eq!(result[0], 1);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_length_increased() {
        let result = heap_insert(&[1,3,5,7,9,8,6], 2);
        assert_eq!(result.len(), 8);
    }

    #[test]
    fn test_insert_into_single() {
        let result = heap_insert(&[5], 3);
        assert_eq!(result[0], 3);
        assert!(is_min_heap(&result));
    }

    #[test]
    fn test_insert_into_empty() {
        assert_eq!(heap_insert(&[], 42), vec![42]);
    }
}
