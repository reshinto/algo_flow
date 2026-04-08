include!("sources/union-find.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn merges_all_into_one_component() {
        let operations = vec![(0, 1), (2, 3), (4, 5), (6, 7), (0, 2), (4, 6), (0, 4)];
        let components = union_find(8, &operations);
        assert_eq!(components.len(), 1);
        assert_eq!(components[0].len(), 8);
    }

    #[test]
    fn no_operations_each_element_own_component() {
        let components = union_find(4, &[]);
        assert_eq!(components.len(), 4);
        for component in &components {
            assert_eq!(component.len(), 1);
        }
    }

    #[test]
    fn single_union_merges_exactly_two() {
        let components = union_find(4, &[(0, 1)]);
        assert_eq!(components.len(), 3);
        let merged = components.iter().find(|component| component.len() == 2);
        assert!(merged.is_some());
        let mut merged_sorted = merged.unwrap().clone();
        merged_sorted.sort();
        assert_eq!(merged_sorted, vec![0, 1]);
    }

    #[test]
    fn duplicate_union_leaves_count_unchanged() {
        let components = union_find(4, &[(0, 1), (0, 1)]);
        assert_eq!(components.len(), 3);
    }

    #[test]
    fn all_elements_accounted_for() {
        let components = union_find(6, &[(0, 1), (2, 3)]);
        let mut all_elements: Vec<usize> = components.into_iter().flatten().collect();
        all_elements.sort();
        assert_eq!(all_elements, vec![0, 1, 2, 3, 4, 5]);
    }

    #[test]
    fn single_element() {
        let components = union_find(1, &[]);
        assert_eq!(components.len(), 1);
        assert_eq!(components[0], vec![0]);
    }

    #[test]
    fn two_elements_with_union() {
        let components = union_find(2, &[(0, 1)]);
        assert_eq!(components.len(), 1);
        let mut sorted = components[0].clone();
        sorted.sort();
        assert_eq!(sorted, vec![0, 1]);
    }

    #[test]
    fn chain_of_unions() {
        let components = union_find(4, &[(0, 1), (1, 2), (2, 3)]);
        assert_eq!(components.len(), 1);
        assert_eq!(components[0].len(), 4);
    }

    #[test]
    fn union_commutative() {
        let components_ab = union_find(4, &[(0, 1)]);
        let components_ba = union_find(4, &[(1, 0)]);
        assert_eq!(components_ab.len(), components_ba.len());
    }
}
