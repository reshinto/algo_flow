include!("build-from-postorder-inorder-iterative.rs");

#[cfg(test)]
mod tests {
    use super::*;

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

    fn postorder_traversal(root: &Option<Box<TreeNode>>) -> Vec<i32> {
        match root {
            None => vec![],
            Some(node) => {
                let mut result = postorder_traversal(&node.left);
                result.extend(postorder_traversal(&node.right));
                result.push(node.value);
                result
            }
        }
    }

    #[test]
    fn test_builds_balanced_7_node_bst() {
        let root = build_from_postorder_inorder_iterative(
            vec![1, 3, 2, 5, 7, 6, 4],
            vec![1, 2, 3, 4, 5, 6, 7],
        );
        assert_eq!(root.as_ref().unwrap().value, 4);
        assert_eq!(inorder(&root), vec![1, 2, 3, 4, 5, 6, 7]);
    }

    #[test]
    fn test_preserves_postorder() {
        let root = build_from_postorder_inorder_iterative(
            vec![1, 3, 2, 5, 7, 6, 4],
            vec![1, 2, 3, 4, 5, 6, 7],
        );
        assert_eq!(postorder_traversal(&root), vec![1, 3, 2, 5, 7, 6, 4]);
    }

    #[test]
    fn test_returns_none_for_empty() {
        assert!(build_from_postorder_inorder_iterative(vec![], vec![]).is_none());
    }

    #[test]
    fn test_single_node() {
        let root = build_from_postorder_inorder_iterative(vec![7], vec![7]);
        assert_eq!(root.as_ref().unwrap().value, 7);
        assert!(root.as_ref().unwrap().left.is_none());
        assert!(root.as_ref().unwrap().right.is_none());
    }
}
