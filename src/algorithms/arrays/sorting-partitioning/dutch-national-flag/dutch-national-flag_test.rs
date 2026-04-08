include!("sources/dutch-national-flag.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mixed_array() {
        let result = dutch_national_flag(&[2, 0, 1, 2, 1, 0]);
        assert_eq!(result, vec![0, 0, 1, 1, 2, 2]);
    }

    #[test]
    fn test_already_sorted() {
        let result = dutch_national_flag(&[0, 0, 1, 1, 2, 2]);
        assert_eq!(result, vec![0, 0, 1, 1, 2, 2]);
    }

    #[test]
    fn test_reverse_sorted() {
        let result = dutch_national_flag(&[2, 2, 1, 1, 0, 0]);
        assert_eq!(result, vec![0, 0, 1, 1, 2, 2]);
    }

    #[test]
    fn test_all_zeros() {
        let result = dutch_national_flag(&[0, 0, 0]);
        assert_eq!(result, vec![0, 0, 0]);
    }

    #[test]
    fn test_all_ones() {
        let result = dutch_national_flag(&[1, 1, 1]);
        assert_eq!(result, vec![1, 1, 1]);
    }

    #[test]
    fn test_all_twos() {
        let result = dutch_national_flag(&[2, 2, 2]);
        assert_eq!(result, vec![2, 2, 2]);
    }

    #[test]
    fn test_empty_array() {
        let result = dutch_national_flag(&[]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_default_input() {
        let result = dutch_national_flag(&[2, 0, 1, 2, 1, 0, 0, 2, 1]);
        assert_eq!(result, vec![0, 0, 0, 1, 1, 1, 2, 2, 2]);
    }

    #[test]
    fn test_does_not_mutate_original() {
        let original = vec![2, 0, 1];
        let _ = dutch_national_flag(&original);
        assert_eq!(original, vec![2, 0, 1]);
    }
}
