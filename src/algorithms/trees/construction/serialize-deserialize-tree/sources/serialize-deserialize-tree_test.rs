include!("serialize-deserialize-tree.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        Some(Box::new(TreeNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<TreeNode>> {
        make_node(value, None, None)
    }

    fn inorder(root: &Option<Box<TreeNode>>) -> Vec<i32> {
        match root {
            None => vec![],
            Some(node) => {
                let mut result = inorder(&node.left);
                result.push(node.value);
                result.extend(inorder(&node.right));
                result
            }
        }
    }

    #[test]
    fn test_serializes_null_as_null_string() {
        assert_eq!(serialize_tree(None), "null");
    }

    #[test]
    fn test_deserializes_null_string() {
        assert!(deserialize_tree("null").is_none());
    }

    #[test]
    fn test_round_trips_balanced_7_node_bst() {
        let original = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        let serialized = serialize_tree(original.clone().map(|n| *n));
        let reconstructed = deserialize_tree(&serialized);
        assert_eq!(reconstructed.as_ref().unwrap().value, 4);
        assert_eq!(inorder(&reconstructed), vec![1, 2, 3, 4, 5, 6, 7]);
    }

    #[test]
    fn test_round_trips_single_node() {
        let original = leaf(99);
        let serialized = serialize_tree(original.clone().map(|n| *n));
        let reconstructed = deserialize_tree(&serialized);
        assert_eq!(reconstructed.as_ref().unwrap().value, 99);
        assert!(reconstructed.as_ref().unwrap().left.is_none());
        assert!(reconstructed.as_ref().unwrap().right.is_none());
    }
}
