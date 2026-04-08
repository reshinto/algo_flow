include!("../sources/n-ary-tree-traversal.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, children: Vec<NAryNode>) -> NAryNode {
        NAryNode { value, children }
    }

    fn leaf(value: i32) -> NAryNode {
        NAryNode { value, children: vec![] }
    }

    #[test]
    fn test_null_root_returns_empty() {
        assert_eq!(n_ary_tree_traversal(None), vec![]);
    }

    #[test]
    fn test_single_node() {
        let node = leaf(5);
        assert_eq!(n_ary_tree_traversal(Some(&node)), vec![5]);
    }

    #[test]
    fn test_correct_preorder() {
        let root = make_node(1, vec![
            make_node(3, vec![leaf(5), leaf(6)]),
            make_node(2, vec![leaf(7), leaf(8)]),
            make_node(4, vec![leaf(9), leaf(10)]),
        ]);
        assert_eq!(n_ary_tree_traversal(Some(&root)), vec![1, 3, 5, 6, 2, 7, 8, 4, 9, 10]);
    }

    #[test]
    fn test_root_before_children() {
        let root = make_node(1, vec![
            make_node(3, vec![leaf(5), leaf(6)]),
            make_node(2, vec![leaf(7), leaf(8)]),
            make_node(4, vec![leaf(9), leaf(10)]),
        ]);
        let result = n_ary_tree_traversal(Some(&root));
        assert_eq!(result[0], 1);
        assert_eq!(result[1], 3);
        assert_eq!(result.len(), 10);
    }

    #[test]
    fn test_flat_tree() {
        let node = leaf(42);
        assert_eq!(n_ary_tree_traversal(Some(&node)), vec![42]);
    }
}
