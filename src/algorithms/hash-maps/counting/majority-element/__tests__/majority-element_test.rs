include!("../sources/majority-element.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_2_for_default() {
        assert_eq!(majority_element(&[2, 2, 1, 1, 1, 2, 2]), 2);
    }

    #[test]
    fn test_returns_3_for_3_2_3() {
        assert_eq!(majority_element(&[3, 2, 3]), 3);
    }

    #[test]
    fn test_returns_single_element() {
        assert_eq!(majority_element(&[1]), 1);
    }

    #[test]
    fn test_returns_1_for_all_ones() {
        assert_eq!(majority_element(&[1, 1, 1, 1]), 1);
    }

    #[test]
    fn test_returns_5_for_5_5_5_1_2() {
        assert_eq!(majority_element(&[5, 5, 5, 1, 2]), 5);
    }

    #[test]
    fn test_returns_1_for_1_2_1_1_3() {
        assert_eq!(majority_element(&[1, 2, 1, 1, 3]), 1);
    }

    #[test]
    fn test_returns_7_for_7_7() {
        assert_eq!(majority_element(&[7, 7]), 7);
    }

    #[test]
    fn test_returns_correct_majority_for_large_repeated_prefix() {
        assert_eq!(majority_element(&[9, 9, 9, 9, 1, 2, 3]), 9);
    }
}
