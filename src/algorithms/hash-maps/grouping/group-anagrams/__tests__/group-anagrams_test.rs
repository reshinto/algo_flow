include!("../sources/group-anagrams.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_groups_into_three_anagram_buckets() {
        let result = group_anagrams(&["eat", "tea", "tan", "ate", "nat", "bat"]);
        assert_eq!(result.len(), 3);
    }

    #[test]
    fn test_places_eat_tea_ate_in_same_group() {
        let result = group_anagrams(&["eat", "tea", "tan", "ate", "nat", "bat"]);
        let eat_group = result.iter().find(|grp| grp.contains(&String::from("eat")));
        assert!(eat_group.is_some());
        let grp = eat_group.unwrap();
        assert!(grp.contains(&String::from("tea")));
        assert!(grp.contains(&String::from("ate")));
    }

    #[test]
    fn test_places_bat_alone() {
        let result = group_anagrams(&["eat", "tea", "tan", "ate", "nat", "bat"]);
        let bat_group = result.iter().find(|grp| grp.contains(&String::from("bat")));
        assert!(bat_group.is_some());
        assert_eq!(bat_group.unwrap().len(), 1);
    }

    #[test]
    fn test_handles_single_word() {
        let result = group_anagrams(&["hello"]);
        assert_eq!(result.len(), 1);
    }

    #[test]
    fn test_handles_all_same_anagram() {
        let result = group_anagrams(&["abc", "bca", "cab"]);
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].len(), 3);
    }

    #[test]
    fn test_handles_no_shared_anagrams() {
        let result = group_anagrams(&["abc", "def", "ghi"]);
        assert_eq!(result.len(), 3);
        for grp in &result {
            assert_eq!(grp.len(), 1);
        }
    }

    #[test]
    fn test_handles_empty_strings() {
        let result = group_anagrams(&["", ""]);
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].len(), 2);
    }
}
