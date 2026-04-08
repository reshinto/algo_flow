include!("../sources/build-from-preorder-inorder.rs");

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

    fn preorder_traversal(root: &Option<Box<TreeNode>>) -> Vec<i32> {
        match root {
            None => vec![],
            Some(node) => {
                let mut result = vec![node.value];
                result.extend(preorder_traversal(&node.left));
                result.extend(preorder_traversal(&node.right));
                result
            }
        }
    }

    #[test]
    fn test_builds_balanced_7_node_bst() {
        let root = build_from_preorder_inorder(
            &[4, 2, 1, 3, 6, 5, 7],
            &[1, 2, 3, 4, 5, 6, 7],
        );
        assert_eq!(root.as_ref().unwrap().value, 4);
        assert_eq!(inorder(&root), vec![1, 2, 3, 4, 5, 6, 7]);
    }

    #[test]
    fn test_preserves_preorder() {
        let root = build_from_preorder_inorder(
            &[4, 2, 1, 3, 6, 5, 7],
            &[1, 2, 3, 4, 5, 6, 7],
        );
        assert_eq!(preorder_traversal(&root), vec![4, 2, 1, 3, 6, 5, 7]);
    }

    #[test]
    fn test_returns_none_for_empty() {
        assert!(build_from_preorder_inorder(&[], &[]).is_none());
    }

    #[test]
    fn test_single_node() {
        let root = build_from_preorder_inorder(&[42], &[42]);
        assert_eq!(root.as_ref().unwrap().value, 42);
    }

    #[test]
    fn test_right_skewed_tree() {
        let root = build_from_preorder_inorder(&[1, 2, 3], &[1, 2, 3]);
        assert_eq!(root.as_ref().unwrap().value, 1);
        assert!(root.as_ref().unwrap().left.is_none());
    }
}
