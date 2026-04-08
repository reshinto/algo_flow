include!("sources/n-repeated-element.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_3_for_1_2_3_3() {
        assert_eq!(n_repeated_element(&[1, 2, 3, 3]), 3);
    }

    #[test]
    fn test_returns_2_for_2_1_2_5_3_2() {
        assert_eq!(n_repeated_element(&[2, 1, 2, 5, 3, 2]), 2);
    }

    #[test]
    fn test_returns_5_for_five_repeated() {
        assert_eq!(n_repeated_element(&[5, 1, 5, 2, 5, 3, 5, 4]), 5);
    }

    #[test]
    fn test_returns_repeated_element_for_two_element_array() {
        assert_eq!(n_repeated_element(&[1, 1]), 1);
    }

    #[test]
    fn test_returns_9_for_9_9_1_2() {
        assert_eq!(n_repeated_element(&[9, 9, 1, 2]), 9);
    }

    #[test]
    fn test_handles_element_at_the_end() {
        assert_eq!(n_repeated_element(&[1, 2, 3, 4, 5, 3, 3, 3]), 3);
    }

    #[test]
    fn test_returns_repeated_element_for_all_same() {
        assert_eq!(n_repeated_element(&[7, 7, 7, 7]), 7);
    }

    #[test]
    fn test_works_with_negative_numbers() {
        assert_eq!(n_repeated_element(&[-1, -1, 2, 3]), -1);
    }
}
