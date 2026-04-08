include!("sources/next-greater-element.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mixed_array() {
        let result = next_greater_element(&[4, 5, 2, 10, 8]);
        assert_eq!(result, vec![5, 10, 10, -1, -1]);
    }

    #[test]
    fn test_strictly_increasing() {
        let result = next_greater_element(&[1, 2, 3, 4]);
        assert_eq!(result, vec![2, 3, 4, -1]);
    }

    #[test]
    fn test_strictly_decreasing() {
        let result = next_greater_element(&[4, 3, 2, 1]);
        assert_eq!(result, vec![-1, -1, -1, -1]);
    }

    #[test]
    fn test_all_equal() {
        let result = next_greater_element(&[5, 5, 5]);
        assert_eq!(result, vec![-1, -1, -1]);
    }

    #[test]
    fn test_single_element() {
        let result = next_greater_element(&[7]);
        assert_eq!(result, vec![-1]);
    }

    #[test]
    fn test_empty_array() {
        let result = next_greater_element(&[]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_default_input() {
        let result = next_greater_element(&[4, 5, 2, 10, 8, 1, 3]);
        assert_eq!(result, vec![5, 10, 10, -1, -1, 3, -1]);
    }

    #[test]
    fn test_with_duplicates() {
        let result = next_greater_element(&[2, 1, 2, 4, 3]);
        assert_eq!(result, vec![4, 2, 4, -1, -1]);
    }
}
