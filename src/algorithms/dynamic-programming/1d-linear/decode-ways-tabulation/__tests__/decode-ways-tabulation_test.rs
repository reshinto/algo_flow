include!("../sources/decode-ways-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_six_for_12321() {
        assert_eq!(decode_ways_tabulation("12321"), 6);
    }

    #[test]
    fn returns_three_for_226() {
        assert_eq!(decode_ways_tabulation("226"), 3);
    }

    #[test]
    fn returns_zero_for_single_zero() {
        assert_eq!(decode_ways_tabulation("0"), 0);
    }

    #[test]
    fn returns_one_for_10() {
        assert_eq!(decode_ways_tabulation("10"), 1);
    }

    #[test]
    fn returns_two_for_12() {
        assert_eq!(decode_ways_tabulation("12"), 2);
    }

    #[test]
    fn returns_zero_for_empty_string() {
        assert_eq!(decode_ways_tabulation(""), 0);
    }

    #[test]
    fn returns_one_for_single_nonzero_digit() {
        assert_eq!(decode_ways_tabulation("7"), 1);
    }

    #[test]
    fn returns_zero_for_double_zero() {
        assert_eq!(decode_ways_tabulation("00"), 0);
    }

    #[test]
    fn returns_one_for_27() {
        assert_eq!(decode_ways_tabulation("27"), 1);
    }
}
