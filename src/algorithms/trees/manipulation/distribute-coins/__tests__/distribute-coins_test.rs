include!("../sources/distribute-coins.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BinaryNode>>, right: Option<Box<BinaryNode>>) -> Option<Box<BinaryNode>> {
        Some(Box::new(BinaryNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BinaryNode>> {
        make_node(value, None, None)
    }

    #[test]
    fn test_null_root_returns_zero() {
        assert_eq!(distribute_coins(&None), 0);
    }

    #[test]
    fn test_single_node_one_coin() {
        assert_eq!(distribute_coins(&leaf(1)), 0);
    }

    #[test]
    fn test_two_node_root_has_two_coins() {
        let root = make_node(2, leaf(0), None);
        assert_eq!(distribute_coins(&root), 1);
    }

    #[test]
    fn test_root_three_coins_two_zero_children() {
        let root = make_node(3, leaf(0), leaf(0));
        assert_eq!(distribute_coins(&root), 2);
    }

    #[test]
    fn test_all_coins_at_deep_leaf() {
        let root = make_node(0, make_node(0, leaf(3), None), leaf(0));
        assert_eq!(distribute_coins(&root), 4);
    }
}
