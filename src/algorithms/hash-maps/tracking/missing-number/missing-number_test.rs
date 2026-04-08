include!("sources/missing-number.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_2_for_3_0_1() {
        assert_eq!(missing_number(&[3, 0, 1]), 2);
    }

    #[test]
    fn test_returns_2_for_0_1() {
        assert_eq!(missing_number(&[0, 1]), 2);
    }

    #[test]
    fn test_returns_8_for_large_array() {
        assert_eq!(missing_number(&[9, 6, 4, 2, 3, 5, 7, 0, 1]), 8);
    }

    #[test]
    fn test_returns_0_for_1() {
        assert_eq!(missing_number(&[1]), 0);
    }

    #[test]
    fn test_returns_1_for_0() {
        assert_eq!(missing_number(&[0]), 1);
    }

    #[test]
    fn test_returns_0_for_empty_array() {
        assert_eq!(missing_number(&[]), 0);
    }

    #[test]
    fn test_returns_3_for_0_1_2() {
        assert_eq!(missing_number(&[0, 1, 2]), 3);
    }

    #[test]
    fn test_returns_5_for_0_1_2_3_4_6() {
        assert_eq!(missing_number(&[0, 1, 2, 3, 4, 6]), 5);
    }
}
