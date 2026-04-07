include!("pascals-triangle-row.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn row_zero() {
        assert_eq!(pascals_triangle_row(0usize), vec![1usize]);
    }

    #[test]
    fn row_one() {
        assert_eq!(pascals_triangle_row(1usize), vec![1usize, 1]);
    }

    #[test]
    fn row_two() {
        assert_eq!(pascals_triangle_row(2usize), vec![1usize, 2, 1]);
    }

    #[test]
    fn row_three() {
        assert_eq!(pascals_triangle_row(3usize), vec![1usize, 3, 3, 1]);
    }

    #[test]
    fn row_four() {
        assert_eq!(pascals_triangle_row(4usize), vec![1usize, 4, 6, 4, 1]);
    }

    #[test]
    fn row_eight() {
        assert_eq!(pascals_triangle_row(8usize), vec![1usize, 8, 28, 56, 70, 56, 28, 8, 1]);
    }

    #[test]
    fn row_six_sums_to_64() {
        let result = pascals_triangle_row(6usize);
        let row_sum: usize = result.iter().sum();
        assert_eq!(row_sum, 64);
    }
}
