include!("../sources/climbing-stairs-memoization.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn climb(number_of_stairs: i64) -> i64 {
        climbing_stairs_memoization(number_of_stairs, &mut HashMap::new())
    }

    #[test]
    fn returns_one_for_zero_stairs() {
        assert_eq!(climb(0), 1);
    }

    #[test]
    fn returns_one_for_one_stair() {
        assert_eq!(climb(1), 1);
    }

    #[test]
    fn returns_two_for_two_stairs() {
        assert_eq!(climb(2), 2);
    }

    #[test]
    fn returns_three_for_three_stairs() {
        assert_eq!(climb(3), 3);
    }

    #[test]
    fn returns_five_for_four_stairs() {
        assert_eq!(climb(4), 5);
    }

    #[test]
    fn returns_thirteen_for_six_stairs() {
        assert_eq!(climb(6), 13);
    }

    #[test]
    fn returns_twenty_one_for_seven_stairs() {
        assert_eq!(climb(7), 21);
    }

    #[test]
    fn matches_expected_sequence() {
        let expected = [1i64, 1, 2, 3, 5, 8, 13, 21];
        for (stair_count, &expected_value) in expected.iter().enumerate() {
            assert_eq!(climb(stair_count as i64), expected_value);
        }
    }
}
