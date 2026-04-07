include!("longest-common-prefix.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_flower_flow_flight() {
        assert_eq!(longest_common_prefix(&["flower", "flow", "flight"]), "fl");
    }

    #[test]
    fn test_no_common_prefix() {
        assert_eq!(longest_common_prefix(&["dog", "racecar", "car"]), "");
    }

    #[test]
    fn test_single_empty_string() {
        assert_eq!(longest_common_prefix(&[""]), "");
    }

    #[test]
    fn test_single_element() {
        assert_eq!(longest_common_prefix(&["hello"]), "hello");
    }

    #[test]
    fn test_empty_array() {
        assert_eq!(longest_common_prefix(&[]), "");
    }

    #[test]
    fn test_one_empty_string() {
        assert_eq!(longest_common_prefix(&["abc", ""]), "");
    }

    #[test]
    fn test_all_identical() {
        assert_eq!(longest_common_prefix(&["abc", "abc", "abc"]), "abc");
    }

    #[test]
    fn test_prefix_is_shortest() {
        assert_eq!(longest_common_prefix(&["ab", "abc", "abcd"]), "ab");
    }

    #[test]
    fn test_a_ab() {
        assert_eq!(longest_common_prefix(&["ab", "a"]), "a");
    }

    #[test]
    fn test_partial_overlap() {
        assert_eq!(longest_common_prefix(&["interview", "internal"]), "inter");
    }
}
