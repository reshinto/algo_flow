include!("../sources/knapsack-01.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_input() {
        assert_eq!(knapsack_01(&[2, 3, 4, 5], &[3, 4, 5, 6], 8usize), 10usize);
    }

    #[test]
    fn classic_example() {
        assert_eq!(knapsack_01(&[1, 2, 3], &[6, 10, 12], 5usize), 22usize);
    }

    #[test]
    fn item_too_heavy() {
        assert_eq!(knapsack_01(&[2], &[3], 1usize), 0usize);
    }

    #[test]
    fn exact_fit() {
        assert_eq!(knapsack_01(&[1], &[1], 1usize), 1usize);
    }

    #[test]
    fn empty_items() {
        assert_eq!(knapsack_01(&[], &[], 10usize), 0usize);
    }

    #[test]
    fn zero_capacity() {
        assert_eq!(knapsack_01(&[2, 3], &[4, 5], 0usize), 0usize);
    }

    #[test]
    fn best_combo() {
        assert_eq!(knapsack_01(&[1, 2, 3], &[1, 6, 10], 5usize), 16usize);
    }

    #[test]
    fn zero_one_constraint() {
        assert_eq!(knapsack_01(&[3], &[5], 9usize), 5usize);
    }
}
