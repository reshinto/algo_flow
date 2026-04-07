include!("unique-paths.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn three_by_seven_grid() {
        assert_eq!(unique_paths(3usize, 7usize), 28usize);
    }

    #[test]
    fn one_by_one_grid() {
        assert_eq!(unique_paths(1usize, 1usize), 1usize);
    }

    #[test]
    fn three_by_two_grid() {
        assert_eq!(unique_paths(3usize, 2usize), 3usize);
    }

    #[test]
    fn three_by_three_grid() {
        assert_eq!(unique_paths(3usize, 3usize), 6usize);
    }

    #[test]
    fn single_row() {
        assert_eq!(unique_paths(1usize, 5usize), 1usize);
    }

    #[test]
    fn single_column() {
        assert_eq!(unique_paths(5usize, 1usize), 1usize);
    }

    #[test]
    fn five_by_five_grid() {
        assert_eq!(unique_paths(5usize, 5usize), 70usize);
    }

    #[test]
    fn seven_by_seven_grid() {
        assert_eq!(unique_paths(7usize, 7usize), 924usize);
    }
}
