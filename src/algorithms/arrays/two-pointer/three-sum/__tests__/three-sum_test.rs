include!("../sources/three-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let result = three_sum(&[-1, 0, 1, 2, -1, -4]);
        assert_eq!(result.len(), 2);
        assert!(result.contains(&[-1, -1, 2]));
        assert!(result.contains(&[-1, 0, 1]));
    }

    #[test]
    fn test_no_triplets() {
        let result = three_sum(&[1, 2, 3]);
        assert_eq!(result.len(), 0);
    }

    #[test]
    fn test_single_zero_triplet() {
        let result = three_sum(&[0, 0, 0]);
        assert_eq!(result.len(), 1);
        assert!(result.contains(&[0, 0, 0]));
    }

    #[test]
    fn test_single_element() {
        let result = three_sum(&[1]);
        assert_eq!(result.len(), 0);
    }

    #[test]
    fn test_empty_input() {
        let result = three_sum(&[]);
        assert_eq!(result.len(), 0);
    }

    #[test]
    fn test_no_duplicates_with_many_zeros() {
        let result = three_sum(&[0, 0, 0, 0]);
        assert_eq!(result.len(), 1);
        assert!(result.contains(&[0, 0, 0]));
    }

    #[test]
    fn test_all_sums_are_zero() {
        let result = three_sum(&[-1, 0, 1, 2, -1, -4]);
        for triplet in &result {
            let triplet_sum: i32 = triplet.iter().sum();
            assert_eq!(triplet_sum, 0);
        }
    }
}
