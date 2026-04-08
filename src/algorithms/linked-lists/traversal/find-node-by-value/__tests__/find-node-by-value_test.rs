include!("../sources/find-node-by-value.rs");

fn build_list(values: &[i32]) -> Option<Box<ListNode>> {
    let mut head: Option<Box<ListNode>> = None;
    for &val in values.iter().rev() {
        head = Some(Box::new(ListNode { value: val, next: head }));
    }
    head
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_found_at_head() {
        let list = build_list(&[5, 2, 3, 4]);
        let result = find_node_by_value(list.as_deref(), 5);
        assert!(result.is_some());
        assert_eq!(result.unwrap().value, 5);
    }

    #[test]
    fn test_found_in_middle() {
        let list = build_list(&[1, 2, 7, 4, 5]);
        let result = find_node_by_value(list.as_deref(), 7);
        assert!(result.is_some());
        assert_eq!(result.unwrap().value, 7);
    }

    #[test]
    fn test_found_at_end() {
        let list = build_list(&[1, 2, 3, 9]);
        let result = find_node_by_value(list.as_deref(), 9);
        assert!(result.is_some());
        assert_eq!(result.unwrap().value, 9);
    }

    #[test]
    fn test_not_found() {
        let list = build_list(&[1, 2, 3, 4]);
        let result = find_node_by_value(list.as_deref(), 42);
        assert!(result.is_none());
    }

    #[test]
    fn test_empty_list() {
        let result = find_node_by_value(None, 5);
        assert!(result.is_none());
    }

    #[test]
    fn test_single_node_match() {
        let list = build_list(&[42]);
        let result = find_node_by_value(list.as_deref(), 42);
        assert!(result.is_some());
        assert_eq!(result.unwrap().value, 42);
    }

    #[test]
    fn test_single_node_no_match() {
        let list = build_list(&[42]);
        let result = find_node_by_value(list.as_deref(), 7);
        assert!(result.is_none());
    }
}
