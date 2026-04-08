include!("sources/all-root-to-leaf-paths-iterative.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        Some(Box::new(TreeNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<TreeNode>> {
        make_node(value, None, None)
    }

    #[test]
    fn test_returns_4_paths_for_7_node_bst() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        let paths = all_root_to_leaf_paths_iterative(&root);
        assert_eq!(paths.len(), 4);
    }

    #[test]
    fn test_contains_correct_path() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        let paths = all_root_to_leaf_paths_iterative(&root);
        assert!(paths.contains(&"4->2->1".to_string()));
    }

    #[test]
    fn test_empty_for_null_root() {
        assert_eq!(all_root_to_leaf_paths_iterative(&None), Vec::<String>::new());
    }

    #[test]
    fn test_single_node() {
        let paths = all_root_to_leaf_paths_iterative(&leaf(5));
        assert_eq!(paths, vec!["5".to_string()]);
    }
}
