include!("../sources/min-stack.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_example() {
        assert_eq!(min_stack(&[5, 3, 7, 1, 8]), 1);
    }

    #[test]
    fn ascending_sequence() {
        assert_eq!(min_stack(&[1, 2, 3]), 1);
    }

    #[test]
    fn descending_sequence() {
        assert_eq!(min_stack(&[3, 2, 1]), 1);
    }

    #[test]
    fn single_element() {
        assert_eq!(min_stack(&[42]), 42);
    }

    #[test]
    fn all_equal() {
        assert_eq!(min_stack(&[7, 7, 7]), 7);
    }

    #[test]
    fn negative_numbers() {
        assert_eq!(min_stack(&[5, -3, 2, -1]), -3);
    }

    #[test]
    fn minimum_first() {
        assert_eq!(min_stack(&[1, 5, 10, 20]), 1);
    }

    #[test]
    fn minimum_last() {
        assert_eq!(min_stack(&[20, 10, 5, 1]), 1);
    }
}
