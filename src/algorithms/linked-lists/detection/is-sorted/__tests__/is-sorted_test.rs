include!("../sources/is-sorted.rs");

fn build_list(values: &[i32]) -> Option<Box<ListNode>> {
    let mut head: Option<Box<ListNode>> = None;
    for &val in values.iter().rev() {
        head = Some(Box::new(ListNode { value: val, next: head }));
    }
    head
}

fn list_as_ref(node: &Option<Box<ListNode>>) -> Option<&ListNode> {
    node.as_deref()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sorted_list() {
        let list = build_list(&[1, 3, 5, 7, 9]);
        assert_eq!(is_sorted(list_as_ref(&list)), true);
    }

    #[test]
    fn test_empty_list() {
        assert_eq!(is_sorted(None), true);
    }

    #[test]
    fn test_single_node() {
        let list = build_list(&[42]);
        assert_eq!(is_sorted(list_as_ref(&list)), true);
    }

    #[test]
    fn test_unsorted_list() {
        let list = build_list(&[1, 5, 3, 7]);
        assert_eq!(is_sorted(list_as_ref(&list)), false);
    }

    #[test]
    fn test_list_with_duplicates() {
        let list = build_list(&[2, 2, 3, 3, 5]);
        assert_eq!(is_sorted(list_as_ref(&list)), true);
    }

    #[test]
    fn test_two_node_sorted() {
        let list = build_list(&[1, 2]);
        assert_eq!(is_sorted(list_as_ref(&list)), true);
    }

    #[test]
    fn test_two_node_unsorted() {
        let list = build_list(&[5, 2]);
        assert_eq!(is_sorted(list_as_ref(&list)), false);
    }

    #[test]
    fn test_first_pair_unsorted() {
        let list = build_list(&[5, 1, 2, 3]);
        assert_eq!(is_sorted(list_as_ref(&list)), false);
    }

    #[test]
    fn test_long_sorted_list() {
        let list = build_list(&[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert_eq!(is_sorted(list_as_ref(&list)), true);
    }

    #[test]
    fn test_last_pair_unsorted() {
        let list = build_list(&[1, 2, 3, 2]);
        assert_eq!(is_sorted(list_as_ref(&list)), false);
    }
}
