include!("sources/suffix-array-construction.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_banana() {
        assert_eq!(suffix_array_construction("banana"), vec![5, 3, 1, 0, 4, 2]);
    }

    #[test]
    fn test_single_char() {
        assert_eq!(suffix_array_construction("a"), vec![0]);
    }

    #[test]
    fn test_empty_string() {
        assert_eq!(suffix_array_construction(""), Vec::<usize>::new());
    }

    #[test]
    fn test_ab() {
        assert_eq!(suffix_array_construction("ab"), vec![0, 1]);
    }

    #[test]
    fn test_ba() {
        assert_eq!(suffix_array_construction("ba"), vec![1, 0]);
    }

    #[test]
    fn test_aaa() {
        assert_eq!(suffix_array_construction("aaa"), vec![2, 1, 0]);
    }

    #[test]
    fn test_mississippi() {
        assert_eq!(
            suffix_array_construction("mississippi"),
            vec![10, 7, 4, 1, 0, 9, 8, 6, 3, 5, 2]
        );
    }

    #[test]
    fn test_length_equals_input() {
        assert_eq!(suffix_array_construction("hello").len(), 5);
    }

    #[test]
    fn test_is_permutation() {
        let text = "abracadabra";
        let result = suffix_array_construction(text);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(sorted, (0..text.len()).collect::<Vec<_>>());
    }

    #[test]
    fn test_abab() {
        assert_eq!(suffix_array_construction("abab"), vec![2, 0, 3, 1]);
    }

    #[test]
    fn test_sorted_suffixes() {
        let text = "banana";
        let suffix_array = suffix_array_construction(text);
        for rank_idx in 0..suffix_array.len() - 1 {
            let current_suffix = &text[suffix_array[rank_idx]..];
            let next_suffix = &text[suffix_array[rank_idx + 1]..];
            assert!(current_suffix <= next_suffix);
        }
    }
}
