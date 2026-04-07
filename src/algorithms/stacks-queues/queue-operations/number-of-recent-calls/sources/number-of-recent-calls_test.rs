include!("number-of-recent-calls.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_input() {
        assert_eq!(number_of_recent_calls(&[1, 100, 3001, 3002]), vec![1, 2, 3, 3]);
    }

    #[test]
    fn single_timestamp() {
        assert_eq!(number_of_recent_calls(&[500]), vec![1]);
    }

    #[test]
    fn all_in_one_window() {
        assert_eq!(number_of_recent_calls(&[1, 500, 1000, 2000, 3000]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn window_slides_forward() {
        assert_eq!(number_of_recent_calls(&[1, 100, 3001, 3002, 6002]), vec![1, 2, 3, 3, 2]);
    }

    #[test]
    fn boundary_included() {
        assert_eq!(number_of_recent_calls(&[1, 3001]), vec![1, 2]);
    }

    #[test]
    fn boundary_excluded() {
        assert_eq!(number_of_recent_calls(&[1, 3002]), vec![1, 1]);
    }

    #[test]
    fn all_spaced_beyond_window() {
        assert_eq!(number_of_recent_calls(&[1, 3002, 6003, 9004]), vec![1, 1, 1, 1]);
    }

    #[test]
    fn empty_timestamps() {
        assert_eq!(number_of_recent_calls(&[]), vec![]);
    }

    #[test]
    fn sequential_expiry() {
        assert_eq!(number_of_recent_calls(&[1000, 2000, 4001, 5001, 7002]), vec![1, 2, 2, 2, 2]);
    }
}
