include!("remove-duplicates-sorted.rs");

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
    fn test_removes_consecutive_duplicates() {
        let list = build_list(&[1, 1, 2, 3, 3, 3, 4, 5, 5]);
        assert_eq!(list_to_vec(remove_duplicates_sorted(list)), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_no_duplicates_unchanged() {
        let list = build_list(&[1, 2, 3, 4, 5]);
        assert_eq!(list_to_vec(remove_duplicates_sorted(list)), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_all_same_values() {
        let list = build_list(&[7, 7, 7, 7]);
        assert_eq!(list_to_vec(remove_duplicates_sorted(list)), vec![7]);
    }

    #[test]
    fn test_empty_list() {
        assert_eq!(remove_duplicates_sorted(None), None);
    }

    #[test]
    fn test_single_element() {
        let list = build_list(&[5]);
        assert_eq!(list_to_vec(remove_duplicates_sorted(list)), vec![5]);
    }

    #[test]
    fn test_two_element_duplicates() {
        let list = build_list(&[3, 3]);
        assert_eq!(list_to_vec(remove_duplicates_sorted(list)), vec![3]);
    }

    #[test]
    fn test_two_different_elements() {
        let list = build_list(&[1, 2]);
        assert_eq!(list_to_vec(remove_duplicates_sorted(list)), vec![1, 2]);
    }

    #[test]
    fn test_mixed_run_lengths() {
        let list = build_list(&[1, 2, 2, 3, 3, 3, 4]);
        assert_eq!(list_to_vec(remove_duplicates_sorted(list)), vec![1, 2, 3, 4]);
    }
}
