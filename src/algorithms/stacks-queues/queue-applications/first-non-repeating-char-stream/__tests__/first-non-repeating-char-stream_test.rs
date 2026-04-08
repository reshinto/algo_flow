include!("../sources/first-non-repeating-char-stream.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_input_aabcbcd() {
        assert_eq!(
            first_non_repeating_char_stream("aabcbcd"),
            vec!["a", "#", "b", "b", "c", "#", "d"]
        );
    }

    #[test]
    fn single_character() {
        assert_eq!(first_non_repeating_char_stream("z"), vec!["z"]);
    }

    #[test]
    fn all_repeating_aabb() {
        assert_eq!(
            first_non_repeating_char_stream("aabb"),
            vec!["a", "#", "b", "#"]
        );
    }

    #[test]
    fn all_distinct_abcd() {
        assert_eq!(
            first_non_repeating_char_stream("abcd"),
            vec!["a", "a", "a", "a"]
        );
    }

    #[test]
    fn two_identical_characters() {
        assert_eq!(first_non_repeating_char_stream("aa"), vec!["a", "#"]);
    }

    #[test]
    fn repeat_evicts_front_aba() {
        assert_eq!(
            first_non_repeating_char_stream("aba"),
            vec!["a", "a", "b"]
        );
    }

    #[test]
    fn empty_string() {
        let empty: Vec<&str> = vec![];
        assert_eq!(first_non_repeating_char_stream(""), empty);
    }
}
