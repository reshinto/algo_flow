include!("house-robber-memoization.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_zero_for_empty_array() {
        assert_eq!(house_robber_memoization(&[]), 0);
    }

    #[test]
    fn returns_single_house_value() {
        assert_eq!(house_robber_memoization(&[5]), 5);
    }

    #[test]
    fn returns_max_of_two_houses() {
        assert_eq!(house_robber_memoization(&[3, 10]), 10);
    }

    #[test]
    fn computes_default_input() {
        assert_eq!(house_robber_memoization(&[2, 7, 9, 3, 1]), 12);
    }

    #[test]
    fn handles_equal_houses() {
        assert_eq!(house_robber_memoization(&[4, 4, 4, 4]), 8);
    }

    #[test]
    fn computes_1_2_3_1() {
        assert_eq!(house_robber_memoization(&[1, 2, 3, 1]), 4);
    }

    #[test]
    fn computes_5_3_4_11_2() {
        assert_eq!(house_robber_memoization(&[5, 3, 4, 11, 2]), 16);
    }
}
