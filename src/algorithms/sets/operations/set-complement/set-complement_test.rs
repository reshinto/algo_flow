include!("sources/set-complement.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn elements_in_universal_not_in_a() {
        let result = set_complement(&[2, 4, 6], &[1, 2, 3, 4, 5, 6, 7, 8]);
        assert_eq!(result, vec![1, 3, 5, 7, 8]);
    }

    #[test]
    fn empty_a_returns_full_universal_set() {
        let result = set_complement(&[], &[1, 2, 3]);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn a_equals_universal_returns_empty() {
        let result = set_complement(&[1, 2, 3], &[1, 2, 3]);
        assert!(result.is_empty());
    }

    #[test]
    fn empty_universal_returns_empty() {
        let result = set_complement(&[1, 2, 3], &[]);
        assert!(result.is_empty());
    }

    #[test]
    fn elements_not_in_a() {
        let result = set_complement(&[10, 20], &[5, 10, 15, 20, 25]);
        assert_eq!(result, vec![5, 15, 25]);
    }

    #[test]
    fn a_elements_outside_universal() {
        let result = set_complement(&[99, 100], &[1, 2, 3]);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn preserves_universal_set_order() {
        let result = set_complement(&[2], &[4, 3, 1, 5]);
        assert_eq!(result, vec![4, 3, 1, 5]);
    }

    #[test]
    fn single_element_universal_not_in_a() {
        let result = set_complement(&[7], &[8]);
        assert_eq!(result, vec![8]);
    }

    #[test]
    fn single_element_universal_in_a() {
        let result = set_complement(&[7], &[7]);
        assert!(result.is_empty());
    }
}
