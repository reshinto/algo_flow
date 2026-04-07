include!("sqrt-binary-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn computes_exact_square_root_of_perfect_square() {
        assert_eq!(sqrt_binary_search(49), 7);
    }

    #[test]
    fn computes_floor_square_root_of_non_perfect_square() {
        assert_eq!(sqrt_binary_search(8), 2);
    }

    #[test]
    fn returns_zero_for_input_zero() {
        assert_eq!(sqrt_binary_search(0), 0);
    }

    #[test]
    fn returns_one_for_input_one() {
        assert_eq!(sqrt_binary_search(1), 1);
    }

    #[test]
    fn computes_sqrt_of_4() {
        assert_eq!(sqrt_binary_search(4), 2);
    }

    #[test]
    fn computes_sqrt_of_9() {
        assert_eq!(sqrt_binary_search(9), 3);
    }

    #[test]
    fn computes_sqrt_of_16() {
        assert_eq!(sqrt_binary_search(16), 4);
    }

    #[test]
    fn computes_floor_sqrt_of_2() {
        assert_eq!(sqrt_binary_search(2), 1);
    }

    #[test]
    fn computes_floor_sqrt_of_3() {
        assert_eq!(sqrt_binary_search(3), 1);
    }

    #[test]
    fn computes_sqrt_of_100() {
        assert_eq!(sqrt_binary_search(100), 10);
    }

    #[test]
    fn computes_floor_sqrt_of_99() {
        assert_eq!(sqrt_binary_search(99), 9);
    }

    #[test]
    fn computes_sqrt_of_144() {
        assert_eq!(sqrt_binary_search(144), 12);
    }

    #[test]
    fn computes_floor_sqrt_of_10() {
        assert_eq!(sqrt_binary_search(10), 3);
    }
}
