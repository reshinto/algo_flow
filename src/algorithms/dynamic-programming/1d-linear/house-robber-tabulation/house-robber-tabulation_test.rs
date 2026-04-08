include!("sources/house-robber-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_zero_for_empty_array() {
        assert_eq!(house_robber_tabulation(&[]), 0);
    }

    #[test]
    fn returns_single_value() {
        assert_eq!(house_robber_tabulation(&[5]), 5);
    }

    #[test]
    fn returns_max_of_two() {
        assert_eq!(house_robber_tabulation(&[2, 7]), 7);
    }

    #[test]
    fn computes_default_input() {
        assert_eq!(house_robber_tabulation(&[2, 7, 9, 3, 1]), 12);
    }

    #[test]
    fn computes_1_2_3_1() {
        assert_eq!(house_robber_tabulation(&[1, 2, 3, 1]), 4);
    }
}
