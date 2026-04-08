include!("../sources/delete-by-value.rs");

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
    fn test_delete_middle() {
        let list = build_list(&[1, 2, 3, 4, 5]);
        assert_eq!(list_to_vec(delete_by_value(list, 3)), vec![1, 2, 4, 5]);
    }

    #[test]
    fn test_delete_head() {
        let list = build_list(&[1, 2, 3]);
        assert_eq!(list_to_vec(delete_by_value(list, 1)), vec![2, 3]);
    }

    #[test]
    fn test_delete_last() {
        let list = build_list(&[1, 2, 3, 4]);
        assert_eq!(list_to_vec(delete_by_value(list, 4)), vec![1, 2, 3]);
    }

    #[test]
    fn test_empty_list() {
        assert_eq!(delete_by_value(None, 5), None);
    }

    #[test]
    fn test_target_not_found() {
        let list = build_list(&[1, 2, 3]);
        assert_eq!(list_to_vec(delete_by_value(list, 99)), vec![1, 2, 3]);
    }

    #[test]
    fn test_single_node_match() {
        let list = build_list(&[7]);
        assert_eq!(list_to_vec(delete_by_value(list, 7)), vec![]);
    }

    #[test]
    fn test_single_node_no_match() {
        let list = build_list(&[7]);
        assert_eq!(list_to_vec(delete_by_value(list, 5)), vec![7]);
    }

    #[test]
    fn test_only_first_occurrence_deleted() {
        let list = build_list(&[1, 2, 2, 3]);
        assert_eq!(list_to_vec(delete_by_value(list, 2)), vec![1, 2, 3]);
    }
}
