include!("../sources/string-to-integer.rs");

#[cfg(test)]
mod tests {
    use super::*;

    const INT32_MIN: i64 = -(1 << 31);
    const INT32_MAX: i64 = (1 << 31) - 1;

    #[test]
    fn test_plain_positive() {
        assert_eq!(string_to_integer("42"), 42);
    }

    #[test]
    fn test_negative_with_leading_whitespace() {
        assert_eq!(string_to_integer("   -42"), -42);
    }

    #[test]
    fn test_stops_at_non_digit() {
        assert_eq!(string_to_integer("4193 with words"), 4193);
    }

    #[test]
    fn test_starts_with_letters() {
        assert_eq!(string_to_integer("words and 987"), 0);
    }

    #[test]
    fn test_empty_string() {
        assert_eq!(string_to_integer(""), 0);
    }

    #[test]
    fn test_only_whitespace() {
        assert_eq!(string_to_integer("   "), 0);
    }

    #[test]
    fn test_explicit_plus() {
        assert_eq!(string_to_integer("+100"), 100);
    }

    #[test]
    fn test_zero() {
        assert_eq!(string_to_integer("0"), 0);
    }

    #[test]
    fn test_clamp_above_max() {
        assert_eq!(string_to_integer("2147483648"), INT32_MAX);
    }

    #[test]
    fn test_clamp_below_min() {
        assert_eq!(string_to_integer("-2147483649"), INT32_MIN);
    }

    #[test]
    fn test_extremely_large() {
        assert_eq!(string_to_integer("99999999999999999"), INT32_MAX);
    }

    #[test]
    fn test_extremely_large_negative() {
        assert_eq!(string_to_integer("-99999999999999999"), INT32_MIN);
    }

    #[test]
    fn test_leading_whitespace_positive() {
        assert_eq!(string_to_integer("  123"), 123);
    }

    #[test]
    fn test_stops_after_sign_with_letters() {
        assert_eq!(string_to_integer("-abc"), 0);
    }

    #[test]
    fn test_int32_max_exact() {
        assert_eq!(string_to_integer("2147483647"), INT32_MAX);
    }

    #[test]
    fn test_int32_min_exact() {
        assert_eq!(string_to_integer("-2147483648"), INT32_MIN);
    }
}
