include!("merge-two-sorted.rs");

fn build_list(values: &[i32]) -> Option<Box<ListNode>> {
    let mut head: Option<Box<ListNode>> = None;
    for &val in values.iter().rev() {
        head = Some(Box::new(ListNode { value: val, next: head }));
    }
    head
}

fn list_to_vec(mut head: Option<Box<ListNode>>) -> Vec<i32> {
    let mut result = Vec::new();
    while let Some(node) = head {
        result.push(node.value);
        head = node.next;
    }
    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_merge_interleaved() {
        let list_a = build_list(&[1, 3, 5, 7]);
        let list_b = build_list(&[2, 4, 6, 8]);
        assert_eq!(list_to_vec(merge_two_sorted(list_a, list_b)), vec![1, 2, 3, 4, 5, 6, 7, 8]);
    }

    #[test]
    fn test_merge_two_empty_lists() {
        assert_eq!(list_to_vec(merge_two_sorted(None, None)), vec![]);
    }

    #[test]
    fn test_merge_empty_with_nonempty() {
        let list_b = build_list(&[1, 2, 3]);
        assert_eq!(list_to_vec(merge_two_sorted(None, list_b)), vec![1, 2, 3]);
    }

    #[test]
    fn test_merge_nonempty_with_empty() {
        let list_a = build_list(&[1, 2, 3]);
        assert_eq!(list_to_vec(merge_two_sorted(list_a, None)), vec![1, 2, 3]);
    }

    #[test]
    fn test_merge_single_nodes() {
        let list_a = build_list(&[1]);
        let list_b = build_list(&[2]);
        assert_eq!(list_to_vec(merge_two_sorted(list_a, list_b)), vec![1, 2]);
    }

    #[test]
    fn test_merge_nonoverlapping_a_before_b() {
        let list_a = build_list(&[1, 2, 3]);
        let list_b = build_list(&[4, 5, 6]);
        assert_eq!(list_to_vec(merge_two_sorted(list_a, list_b)), vec![1, 2, 3, 4, 5, 6]);
    }

    #[test]
    fn test_merge_nonoverlapping_b_before_a() {
        let list_a = build_list(&[4, 5, 6]);
        let list_b = build_list(&[1, 2, 3]);
        assert_eq!(list_to_vec(merge_two_sorted(list_a, list_b)), vec![1, 2, 3, 4, 5, 6]);
    }

    #[test]
    fn test_merge_with_duplicate_values() {
        let list_a = build_list(&[1, 3, 5]);
        let list_b = build_list(&[1, 4, 5]);
        assert_eq!(list_to_vec(merge_two_sorted(list_a, list_b)), vec![1, 1, 3, 4, 5, 5]);
    }

    #[test]
    fn test_merge_single_nodes_reversed() {
        let list_a = build_list(&[5]);
        let list_b = build_list(&[3]);
        assert_eq!(list_to_vec(merge_two_sorted(list_a, list_b)), vec![3, 5]);
    }

    #[test]
    fn test_merge_unequal_length_lists() {
        let list_a = build_list(&[10, 20, 30]);
        let list_b = build_list(&[15, 25]);
        assert_eq!(list_to_vec(merge_two_sorted(list_a, list_b)), vec![10, 15, 20, 25, 30]);
    }
}
