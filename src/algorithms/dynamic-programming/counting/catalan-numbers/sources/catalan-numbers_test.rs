include!("catalan-numbers.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_one_for_c0() {
        assert_eq!(catalan_number(0usize), 1usize);
    }

    #[test]
    fn returns_one_for_c1() {
        assert_eq!(catalan_number(1usize), 1usize);
    }

    #[test]
    fn returns_two_for_c2() {
        assert_eq!(catalan_number(2usize), 2usize);
    }

    #[test]
    fn returns_five_for_c3() {
        assert_eq!(catalan_number(3usize), 5usize);
    }

    #[test]
    fn returns_42_for_c5() {
        assert_eq!(catalan_number(5usize), 42usize);
    }

    #[test]
    fn returns_1430_for_c8() {
        assert_eq!(catalan_number(8usize), 1430usize);
    }
}
