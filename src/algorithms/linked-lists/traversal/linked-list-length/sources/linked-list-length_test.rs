include!("linked-list-length.rs");

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
    fn test_five_node_list() {
        let list = build_list(&[1, 2, 3, 4, 5]);
        assert_eq!(linked_list_length(list.as_deref()), 5);
    }

    #[test]
    fn test_null_input() {
        assert_eq!(linked_list_length(None), 0);
    }

    #[test]
    fn test_single_node() {
        let list = build_list(&[42]);
        assert_eq!(linked_list_length(list.as_deref()), 1);
    }

    #[test]
    fn test_three_node_list() {
        let list = build_list(&[10, 20, 30]);
        assert_eq!(linked_list_length(list.as_deref()), 3);
    }

    #[test]
    fn test_ten_node_list() {
        let list = build_list(&[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert_eq!(linked_list_length(list.as_deref()), 10);
    }
}
