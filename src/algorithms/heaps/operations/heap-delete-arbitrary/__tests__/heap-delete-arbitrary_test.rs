include!("../sources/heap-delete-arbitrary.rs");

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
    fn test_removes_node_and_maintains_heap() {
        let result = heap_delete_arbitrary(&[1,3,5,7,9,8,6], 2);
        assert!(is_min_heap(&result));
        assert_eq!(result.len(), 6);
    }

    #[test]
    fn test_deleted_value_absent() {
        let result = heap_delete_arbitrary(&[1,3,5,7,9,8,6], 2);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(sorted, vec![1,3,6,7,8,9]);
    }

    #[test]
    fn test_delete_root() {
        let result = heap_delete_arbitrary(&[1,3,5,7,9,8,6], 0);
        assert!(is_min_heap(&result));
        assert_eq!(result.len(), 6);
        assert_ne!(result[0], 1);
    }

    #[test]
    fn test_two_element_delete_0() {
        assert_eq!(heap_delete_arbitrary(&[1,5], 0), vec![5]);
    }

    #[test]
    fn test_two_element_delete_1() {
        assert_eq!(heap_delete_arbitrary(&[1,5], 1), vec![1]);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(heap_delete_arbitrary(&[42], 0), Vec::<i64>::new());
    }

    #[test]
    fn test_sift_up_triggered() {
        let result = heap_delete_arbitrary(&[1,10,5,15,20,8,6], 3);
        assert!(is_min_heap(&result));
    }
}
