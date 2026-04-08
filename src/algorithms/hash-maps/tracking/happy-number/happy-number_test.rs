include!("sources/happy-number.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_identifies_19_as_happy() {
        assert!(happy_number(19));
    }

    #[test]
    fn test_identifies_1_as_happy() {
        assert!(happy_number(1));
    }

    #[test]
    fn test_identifies_7_as_happy() {
        assert!(happy_number(7));
    }

    #[test]
    fn test_identifies_4_as_not_happy() {
        assert!(!happy_number(4));
    }

    #[test]
    fn test_identifies_2_as_not_happy() {
        assert!(!happy_number(2));
    }

    #[test]
    fn test_identifies_100_as_happy() {
        assert!(happy_number(100));
    }

    #[test]
    fn test_identifies_116_as_not_happy() {
        assert!(!happy_number(116));
    }

    #[test]
    fn test_identifies_89_as_not_happy() {
        assert!(!happy_number(89));
    }
}
