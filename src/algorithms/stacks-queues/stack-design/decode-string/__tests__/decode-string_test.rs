include!("../sources/decode-string.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn simple_single_level() {
        assert_eq!(decode_string("3[a]"), "aaa");
    }

    #[test]
    fn nested_brackets() {
        assert_eq!(decode_string("3[a2[c]]"), "accaccacc");
    }

    #[test]
    fn multiple_top_level_groups() {
        assert_eq!(decode_string("2[abc]3[cd]ef"), "abcabccdcdcdef");
    }

    #[test]
    fn plain_string_unchanged() {
        assert_eq!(decode_string("abc"), "abc");
    }

    #[test]
    fn single_char_repeated() {
        assert_eq!(decode_string("5[z]"), "zzzzz");
    }

    #[test]
    fn deeply_nested() {
        assert_eq!(decode_string("2[2[a]]"), "aaaa");
    }

    #[test]
    fn empty_string() {
        assert_eq!(decode_string(""), "");
    }

    #[test]
    fn multi_digit_count() {
        assert_eq!(decode_string("10[a]"), "aaaaaaaaaa");
    }

    #[test]
    fn letters_around_bracket_group() {
        assert_eq!(decode_string("a2[b]c"), "abbc");
    }
}
