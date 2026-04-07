include!("flatten-to-linked-list-iterative.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BinaryNode>>, right: Option<Box<BinaryNode>>) -> Option<Box<BinaryNode>> {
        Some(Box::new(BinaryNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BinaryNode>> {
        make_node(value, None, None)
    }

    fn right_chain(root: &Option<Box<BinaryNode>>) -> Vec<i32> {
        let mut result = vec![];
        let mut current = root;
        loop {
            match current {
                None => break,
                Some(node) => {
                    result.push(node.value);
                    current = &node.right;
                }
            }
        }
        result
    }

    #[test]
    fn test_single_node_unchanged() {
        let mut root = leaf(1);
        flatten_to_linked_list_iterative(&mut root);
        assert!(root.as_ref().unwrap().left.is_none());
        assert!(root.as_ref().unwrap().right.is_none());
    }

    #[test]
    fn test_flattens_7_node_bst() {
        let mut root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        flatten_to_linked_list_iterative(&mut root);
        assert_eq!(right_chain(&root), vec![4, 2, 1, 3, 6, 5, 7]);
    }

    #[test]
    fn test_all_left_pointers_null() {
        let mut root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        flatten_to_linked_list_iterative(&mut root);
        let mut current = &root;
        loop {
            match current {
                None => break,
                Some(node) => {
                    assert!(node.left.is_none());
                    current = &node.right;
                }
            }
        }
    }
}
