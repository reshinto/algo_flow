include!("sources/insert-at-position.rs");

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
    fn test_insert_at_position_2() {
        let list = build_list(&[1, 3, 5, 7]);
        assert_eq!(list_to_vec(insert_at_position(list, 4, 2)), vec![1, 3, 4, 5, 7]);
    }

    #[test]
    fn test_insert_at_head() {
        let list = build_list(&[2, 3, 4]);
        assert_eq!(list_to_vec(insert_at_position(list, 1, 0)), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_insert_at_end() {
        let list = build_list(&[1, 2, 3]);
        assert_eq!(list_to_vec(insert_at_position(list, 4, 3)), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_insert_empty_list_at_zero() {
        assert_eq!(list_to_vec(insert_at_position(None, 5, 0)), vec![5]);
    }

    #[test]
    fn test_insert_single_node_at_position_1() {
        let list = build_list(&[10]);
        assert_eq!(list_to_vec(insert_at_position(list, 20, 1)), vec![10, 20]);
    }

    #[test]
    fn test_position_beyond_length() {
        let list = build_list(&[1, 2]);
        assert_eq!(list_to_vec(insert_at_position(list, 3, 10)), vec![1, 2]);
    }

    #[test]
    fn test_insert_zero_value() {
        let list = build_list(&[1, 2]);
        assert_eq!(list_to_vec(insert_at_position(list, 0, 1)), vec![1, 0, 2]);
    }
}
