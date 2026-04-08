include!("sources/heapify-single-node.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn is_path_valid(array: &[i64], start_idx: usize) -> bool {
        let size = array.len();
        let mut parent_idx = start_idx;
        loop {
            let left_idx = 2 * parent_idx + 1;
            let right_idx = 2 * parent_idx + 2;
            if left_idx >= size { break; }
            if array[parent_idx] > array[left_idx] { return false; }
            if right_idx < size && array[parent_idx] > array[right_idx] { return false; }
            let smallest_child = if right_idx < size && array[right_idx] < array[left_idx] { right_idx } else { left_idx };
            parent_idx = smallest_child;
        }
        true
    }

    #[test]
    fn test_sifts_down_root() {
        let result = heapify_single_node(&[9,1,7,2,3,8,5,6,4], 0);
        assert!(is_path_valid(&result, 0));
    }

    #[test]
    fn test_root_becomes_minimum() {
        let result = heapify_single_node(&[9,1,7,2,3,8,5,6,4], 0);
        assert_eq!(result[0], 1);
    }

    #[test]
    fn test_non_root_subtree() {
        let result = heapify_single_node(&[1,9,2,3,4,5,6], 1);
        assert!(is_path_valid(&result, 1));
    }

    #[test]
    fn test_no_op_when_valid() {
        let input = vec![1,2,3,4,5,6,7];
        let result = heapify_single_node(&input, 0);
        assert_eq!(result, input);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(heapify_single_node(&[42], 0), vec![42]);
    }

    #[test]
    fn test_leaf_no_sift() {
        let input = vec![1,2,3,4,5];
        let result = heapify_single_node(&input, 4);
        assert_eq!(result, input);
    }
}
