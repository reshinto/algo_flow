include!("../sources/previous-smaller-element.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let result = previous_smaller_element(&[4, 10, 5, 8, 20, 15, 3, 12]);
        assert_eq!(result, vec![-1, 4, 4, 5, 8, 8, -1, 3]);
    }

    #[test]
    fn test_strictly_decreasing() {
        let result = previous_smaller_element(&[5, 4, 3, 2, 1]);
        assert_eq!(result, vec![-1, -1, -1, -1, -1]);
    }

    #[test]
    fn test_strictly_increasing() {
        let result = previous_smaller_element(&[1, 2, 3, 4, 5]);
        assert_eq!(result, vec![-1, 1, 2, 3, 4]);
    }

    #[test]
    fn test_all_equal() {
        let result = previous_smaller_element(&[3, 3, 3, 3]);
        assert_eq!(result, vec![-1, -1, -1, -1]);
    }

    #[test]
    fn test_single_element() {
        let result = previous_smaller_element(&[7]);
        assert_eq!(result, vec![-1]);
    }

    #[test]
    fn test_empty_array() {
        let result = previous_smaller_element(&[]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_two_elements_first_smaller() {
        let result = previous_smaller_element(&[2, 5]);
        assert_eq!(result, vec![-1, 2]);
    }

    #[test]
    fn test_valley_peak_pattern() {
        let result = previous_smaller_element(&[1, 3, 2, 4]);
        assert_eq!(result, vec![-1, 1, 1, 2]);
    }
}
