include!("sources/flatten-nested-list-iterator.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn flattens_complex_nested_list() {
        let input = vec![
            NestedItem::List(vec![NestedItem::Value(1), NestedItem::List(vec![NestedItem::Value(2)])]),
            NestedItem::Value(3),
            NestedItem::List(vec![NestedItem::Value(4), NestedItem::List(vec![NestedItem::Value(5), NestedItem::Value(6)])]),
        ];
        assert_eq!(flatten_nested_list_iterator(input), vec![1, 2, 3, 4, 5, 6]);
    }

    #[test]
    fn flat_list_unchanged() {
        let input = vec![NestedItem::Value(1), NestedItem::Value(2), NestedItem::Value(3), NestedItem::Value(4)];
        assert_eq!(flatten_nested_list_iterator(input), vec![1, 2, 3, 4]);
    }

    #[test]
    fn deeply_nested_single_value() {
        let input = vec![NestedItem::List(vec![NestedItem::List(vec![NestedItem::Value(7)])])];
        assert_eq!(flatten_nested_list_iterator(input), vec![7]);
    }

    #[test]
    fn empty_input() {
        assert_eq!(flatten_nested_list_iterator(vec![]), vec![]);
    }

    #[test]
    fn mixed_depth_left_to_right() {
        let input = vec![
            NestedItem::Value(1),
            NestedItem::List(vec![NestedItem::Value(2), NestedItem::List(vec![NestedItem::Value(3), NestedItem::List(vec![NestedItem::Value(4)])])]),
        ];
        assert_eq!(flatten_nested_list_iterator(input), vec![1, 2, 3, 4]);
    }

    #[test]
    fn leetcode_example() {
        let input = vec![
            NestedItem::List(vec![NestedItem::Value(1), NestedItem::Value(1)]),
            NestedItem::Value(2),
            NestedItem::List(vec![NestedItem::Value(1), NestedItem::Value(1)]),
        ];
        assert_eq!(flatten_nested_list_iterator(input), vec![1, 1, 2, 1, 1]);
    }
}
