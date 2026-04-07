include!("sort-characters-by-frequency.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sorts_tree_so_e_appears_first() {
        let result = sort_characters_by_frequency("tree");
        assert_eq!(&result[..2], "ee");
        assert_eq!(result.len(), 4);
        assert!(result.contains('t'));
        assert!(result.contains('r'));
    }

    #[test]
    fn test_returns_single_char_unchanged() {
        assert_eq!(sort_characters_by_frequency("z"), "z");
    }

    #[test]
    fn test_places_most_frequent_char_first_in_cccaab() {
        let result = sort_characters_by_frequency("cccaab");
        assert_eq!(&result[..3], "ccc");
        assert_eq!(result.len(), 6);
    }

    #[test]
    fn test_handles_all_identical_characters() {
        assert_eq!(sort_characters_by_frequency("aaaa"), "aaaa");
    }

    #[test]
    fn test_preserves_all_characters_in_output() {
        let input = "mississippi";
        let result = sort_characters_by_frequency(input);
        assert_eq!(result.len(), input.len());
        let mut sorted_input: Vec<char> = input.chars().collect();
        sorted_input.sort_unstable();
        let mut sorted_result: Vec<char> = result.chars().collect();
        sorted_result.sort_unstable();
        assert_eq!(sorted_result, sorted_input);
    }
}
