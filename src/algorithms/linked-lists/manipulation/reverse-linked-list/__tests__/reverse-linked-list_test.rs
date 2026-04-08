include!("../sources/reverse-linked-list.rs");

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
    fn test_reverse_five_node_list() {
        let list = build_list(&[1, 2, 3, 4, 5]);
        assert_eq!(list_to_vec(reverse_linked_list(list)), vec![5, 4, 3, 2, 1]);
    }

    #[test]
    fn test_null_input() {
        assert_eq!(reverse_linked_list(None), None);
    }

    #[test]
    fn test_single_node() {
        let list = build_list(&[42]);
        assert_eq!(list_to_vec(reverse_linked_list(list)), vec![42]);
    }

    #[test]
    fn test_two_node_list() {
        let list = build_list(&[1, 2]);
        assert_eq!(list_to_vec(reverse_linked_list(list)), vec![2, 1]);
    }

    #[test]
    fn test_three_node_list() {
        let list = build_list(&[3, 1, 4]);
        assert_eq!(list_to_vec(reverse_linked_list(list)), vec![4, 1, 3]);
    }

    #[test]
    fn test_new_head_is_last_element() {
        let list = build_list(&[10, 20, 30]);
        let reversed = reverse_linked_list(list);
        assert_eq!(reversed.as_ref().map(|node| node.value), Some(30));
    }
}
