include!("../sources/boyer-moore-voting.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_majority() {
        let (majority_element, _count) = boyer_moore_voting(&[2, 2, 1, 1, 1, 2, 2]);
        assert_eq!(majority_element, 2);
    }

    #[test]
    fn test_all_same() {
        let (majority_element, _count) = boyer_moore_voting(&[5, 5, 5]);
        assert_eq!(majority_element, 5);
    }

    #[test]
    fn test_single_element() {
        let (majority_element, _count) = boyer_moore_voting(&[42]);
        assert_eq!(majority_element, 42);
    }

    #[test]
    fn test_empty_array() {
        let (majority_element, count) = boyer_moore_voting(&[]);
        assert_eq!(majority_element, -1);
        assert_eq!(count, 0);
    }

    #[test]
    fn test_majority_at_start() {
        let (majority_element, _count) = boyer_moore_voting(&[3, 3, 3, 1, 2]);
        assert_eq!(majority_element, 3);
    }

    #[test]
    fn test_majority_at_end() {
        let (majority_element, _count) = boyer_moore_voting(&[1, 2, 7, 7, 7]);
        assert_eq!(majority_element, 7);
    }

    #[test]
    fn test_alternating_with_majority() {
        let (majority_element, _count) = boyer_moore_voting(&[1, 9, 1, 9, 1, 9, 1]);
        assert_eq!(majority_element, 1);
    }

    #[test]
    fn test_two_equal_elements() {
        let (majority_element, _count) = boyer_moore_voting(&[4, 4]);
        assert_eq!(majority_element, 4);
    }

    #[test]
    fn test_large_majority() {
        let (majority_element, _count) = boyer_moore_voting(&[6, 6, 6, 1, 6, 2, 6, 3, 6]);
        assert_eq!(majority_element, 6);
    }

    #[test]
    fn test_negative_numbers() {
        let (majority_element, _count) = boyer_moore_voting(&[-3, -3, 1, -3, 2]);
        assert_eq!(majority_element, -3);
    }
}
