include!("../sources/move-zeros.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_moves_zeros_to_end() {
        let result = move_zeros(&[0, 1, 0, 3, 12]);
        assert_eq!(result, vec![1, 3, 12, 0, 0]);
    }

    #[test]
    fn test_no_zeros() {
        let result = move_zeros(&[1, 2, 3, 4, 5]);
        assert_eq!(result, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_all_zeros() {
        let result = move_zeros(&[0, 0, 0]);
        assert_eq!(result, vec![0, 0, 0]);
    }

    #[test]
    fn test_empty_array() {
        let result = move_zeros(&[]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_zeros_at_start() {
        let result = move_zeros(&[0, 0, 1, 2]);
        assert_eq!(result, vec![1, 2, 0, 0]);
    }

    #[test]
    fn test_zeros_already_at_end() {
        let result = move_zeros(&[1, 2, 3, 0, 0]);
        assert_eq!(result, vec![1, 2, 3, 0, 0]);
    }

    #[test]
    fn test_default_input() {
        let result = move_zeros(&[0, 1, 0, 3, 12, 0, 5]);
        assert_eq!(result, vec![1, 3, 12, 5, 0, 0, 0]);
    }

    #[test]
    fn test_does_not_mutate_original() {
        let original = vec![0, 1, 0, 3, 12];
        let _ = move_zeros(&original);
        assert_eq!(original, vec![0, 1, 0, 3, 12]);
    }
}
