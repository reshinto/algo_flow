include!("decode-ways-memoization.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_zero_for_empty_string() {
        assert_eq!(decode_ways_memoization(""), 0);
    }

    #[test]
    fn returns_one_for_single_nonzero_digit() {
        assert_eq!(decode_ways_memoization("1"), 1);
    }

    #[test]
    fn returns_zero_for_leading_zero() {
        assert_eq!(decode_ways_memoization("0"), 0);
    }

    #[test]
    fn returns_two_for_12() {
        assert_eq!(decode_ways_memoization("12"), 2);
    }

    #[test]
    fn returns_one_for_27() {
        assert_eq!(decode_ways_memoization("27"), 1);
    }

    #[test]
    fn returns_zero_for_30() {
        assert_eq!(decode_ways_memoization("30"), 0);
    }

    #[test]
    fn returns_three_for_123() {
        assert_eq!(decode_ways_memoization("123"), 3);
    }

    #[test]
    fn returns_six_for_12321() {
        assert_eq!(decode_ways_memoization("12321"), 6);
    }

    #[test]
    fn returns_three_for_226() {
        assert_eq!(decode_ways_memoization("226"), 3);
    }

    #[test]
    fn returns_zero_for_double_zero() {
        assert_eq!(decode_ways_memoization("00"), 0);
    }
}
