include!("sources/invert-binary-tree.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BinaryNode>>, right: Option<Box<BinaryNode>>) -> Option<Box<BinaryNode>> {
        Some(Box::new(BinaryNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BinaryNode>> {
        make_node(value, None, None)
    }

    fn level_order(root: Option<Box<BinaryNode>>) -> Vec<i32> {
        let mut result = vec![];
        let mut queue = std::collections::VecDeque::new();
        if let Some(node) = root {
            queue.push_back(node);
        }
        while let Some(node) = queue.pop_front() {
            result.push(node.value);
            if let Some(left) = node.left { queue.push_back(left); }
            if let Some(right) = node.right { queue.push_back(right); }
        }
        result
    }

    #[test]
    fn test_null_returns_none() {
        assert!(invert_binary_tree(None).is_none());
    }

    #[test]
    fn test_single_node() {
        let result = invert_binary_tree(leaf(1));
        assert_eq!(result.as_ref().unwrap().value, 1);
    }

    #[test]
    fn test_inverts_7_node_bst() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        let result = invert_binary_tree(root);
        assert_eq!(level_order(result), vec![4, 6, 2, 7, 5, 3, 1]);
    }
}
