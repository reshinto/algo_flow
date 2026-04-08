include!("sources/four-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let result = four_sum(&[1, 0, -1, 0, -2, 2], 0);
        assert_eq!(result.len(), 3);
        assert!(result.contains(&[-2, -1, 1, 2]));
        assert!(result.contains(&[-2, 0, 0, 2]));
        assert!(result.contains(&[-1, 0, 0, 1]));
    }

    #[test]
    fn test_no_quadruplets() {
        let result = four_sum(&[1, 2, 3, 4], 100);
        assert_eq!(result.len(), 0);
    }

    #[test]
    fn test_all_zero_quadruplet() {
        let result = four_sum(&[0, 0, 0, 0], 0);
        assert_eq!(result.len(), 1);
        assert!(result.contains(&[0, 0, 0, 0]));
    }

    #[test]
    fn test_fewer_than_four_elements() {
        let result = four_sum(&[1, 2, 3], 6);
        assert_eq!(result.len(), 0);
    }

    #[test]
    fn test_empty_input() {
        let result = four_sum(&[], 0);
        assert_eq!(result.len(), 0);
    }

    #[test]
    fn test_no_duplicates_with_repeated_input() {
        let result = four_sum(&[0, 0, 0, 0, 0], 0);
        assert_eq!(result.len(), 1);
    }

    #[test]
    fn test_all_sums_equal_target() {
        let result = four_sum(&[1, 0, -1, 0, -2, 2], 0);
        for quad in &result {
            let quad_sum: i64 = quad.iter().map(|&val| val as i64).sum();
            assert_eq!(quad_sum, 0);
        }
    }
}
