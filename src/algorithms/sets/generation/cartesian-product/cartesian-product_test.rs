include!("sources/cartesian-product.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_input() {
        let result = cartesian_product(&[1, 2, 3], &[4, 5]);
        assert_eq!(result, vec![(1, 4), (1, 5), (2, 4), (2, 5), (3, 4), (3, 5)]);
    }

    #[test]
    fn single_element_sets() {
        let result = cartesian_product(&[7], &[9]);
        assert_eq!(result, vec![(7, 9)]);
    }

    #[test]
    fn n_times_m_pairs() {
        let result = cartesian_product(&[1, 2], &[3, 4]);
        assert_eq!(result.len(), 4);
    }

    #[test]
    fn empty_set_a() {
        let result = cartesian_product(&[], &[4, 5]);
        assert!(result.is_empty());
    }

    #[test]
    fn empty_set_b() {
        let result = cartesian_product(&[1, 2, 3], &[]);
        assert!(result.is_empty());
    }

    #[test]
    fn both_empty() {
        let result = cartesian_product(&[], &[]);
        assert!(result.is_empty());
    }

    #[test]
    fn preserves_order() {
        let result = cartesian_product(&[10, 20], &[1, 2]);
        assert_eq!(result[0], (10, 1));
        assert_eq!(result[1], (10, 2));
        assert_eq!(result[2], (20, 1));
        assert_eq!(result[3], (20, 2));
    }

    #[test]
    fn ordered_tuple_pairs() {
        let result = cartesian_product(&[5], &[3, 7]);
        assert_eq!(result, vec![(5, 3), (5, 7)]);
    }

    #[test]
    fn duplicate_values() {
        let result = cartesian_product(&[1, 1], &[2]);
        assert_eq!(result, vec![(1, 2), (1, 2)]);
    }
}
