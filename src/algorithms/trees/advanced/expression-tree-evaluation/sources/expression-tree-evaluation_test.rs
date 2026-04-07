include!("expression-tree-evaluation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_expression() {
        assert_eq!(expression_tree_evaluation("3 4 + 2 * 7 /"), 2);
    }

    #[test]
    fn test_simple_addition() {
        assert_eq!(expression_tree_evaluation("3 4 +"), 7);
    }

    #[test]
    fn test_simple_multiplication() {
        assert_eq!(expression_tree_evaluation("5 6 *"), 30);
    }

    #[test]
    fn test_subtraction() {
        assert_eq!(expression_tree_evaluation("10 4 -"), 6);
    }

    #[test]
    fn test_integer_division() {
        assert_eq!(expression_tree_evaluation("7 2 /"), 3);
    }

    #[test]
    fn test_nested_expression() {
        assert_eq!(expression_tree_evaluation("2 3 * 4 5 * +"), 26);
    }

    #[test]
    fn test_single_number() {
        assert_eq!(expression_tree_evaluation("42"), 42);
    }
}
