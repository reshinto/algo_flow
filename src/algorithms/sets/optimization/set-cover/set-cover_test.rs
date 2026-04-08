include!("sources/set-cover.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashSet;

    #[test]
    fn covers_default_universe() {
        let universe = vec![1, 2, 3, 4, 5, 6, 7, 8];
        let sets = vec![
            vec![1, 2, 3],
            vec![2, 4],
            vec![3, 4, 5],
            vec![5, 6, 7],
            vec![6, 7, 8],
        ];
        let result = set_cover(&universe, &sets);
        let covered: HashSet<i32> = result.selected_sets.iter().flatten().copied().collect();
        assert!(covered.contains(&1) && covered.contains(&8));
        assert!(!result.selected_sets.is_empty());
        assert!(result.selected_sets.len() <= 5);
    }

    #[test]
    fn single_set_covers_universe() {
        let sets = vec![vec![1, 2, 3], vec![1], vec![2]];
        let result = set_cover(&[1, 2, 3], &sets);
        assert_eq!(result.selected_sets.len(), 1);
        assert_eq!(result.selected_indices[0], 0);
    }

    #[test]
    fn disjoint_singletons() {
        let sets = vec![vec![1], vec![2], vec![3]];
        let result = set_cover(&[1, 2, 3], &sets);
        let covered: HashSet<i32> = result.selected_sets.iter().flatten().copied().collect();
        assert!(covered.contains(&1) && covered.contains(&2) && covered.contains(&3));
        assert_eq!(result.selected_sets.len(), 3);
    }

    #[test]
    fn selects_greediest_first() {
        let sets = vec![vec![1, 2, 3], vec![4]];
        let result = set_cover(&[1, 2, 3, 4], &sets);
        assert_eq!(result.selected_indices[0], 0);
    }

    #[test]
    fn empty_universe_returns_empty_selection() {
        let sets = vec![vec![1, 2], vec![3, 4]];
        let result = set_cover(&[], &sets);
        assert!(result.selected_indices.is_empty());
        assert!(result.selected_sets.is_empty());
    }

    #[test]
    fn selected_indices_match_selected_sets() {
        let all_sets = vec![
            vec![1, 2, 3],
            vec![2, 4],
            vec![3, 4, 5],
            vec![5, 6, 7],
            vec![6, 7, 8],
        ];
        let result = set_cover(&[1, 2, 3, 4, 5, 6, 7, 8], &all_sets);
        for (pos, &idx) in result.selected_indices.iter().enumerate() {
            assert_eq!(result.selected_sets[pos], all_sets[idx]);
        }
    }
}
