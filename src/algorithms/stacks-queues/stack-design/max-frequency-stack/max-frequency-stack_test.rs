include!("sources/max-frequency-stack.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_example() {
        assert_eq!(max_frequency_stack(&[5, 7, 5, 7, 4, 5]), vec![5, 7, 5, 4, 7, 5]);
    }

    #[test]
    fn all_same_frequency_lifo() {
        assert_eq!(max_frequency_stack(&[1, 2, 3]), vec![3, 2, 1]);
    }

    #[test]
    fn single_element_repeated() {
        assert_eq!(max_frequency_stack(&[9, 9, 9]), vec![9, 9, 9]);
    }

    #[test]
    fn two_elements_alternated() {
        assert_eq!(max_frequency_stack(&[1, 2, 1, 2]), vec![2, 1, 2, 1]);
    }

    #[test]
    fn single_element() {
        assert_eq!(max_frequency_stack(&[42]), vec![42]);
    }

    #[test]
    fn empty_input() {
        assert_eq!(max_frequency_stack(&[]), vec![]);
    }

    #[test]
    fn most_frequent_pops_first() {
        let result = max_frequency_stack(&[7, 1, 7, 2, 7]);
        assert_eq!(result[0], 7);
        assert_eq!(result[1], 7);
        assert_eq!(result[2], 2);
    }

    #[test]
    fn correct_total_length() {
        assert_eq!(max_frequency_stack(&[3, 1, 3, 2, 3, 1]).len(), 6);
    }
}
