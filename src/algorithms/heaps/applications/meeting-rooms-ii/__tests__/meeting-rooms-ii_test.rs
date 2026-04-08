include!("../sources/meeting-rooms-ii.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_classic_example() {
        assert_eq!(meeting_rooms_ii(&[(0, 30), (5, 10), (15, 20)]), 2);
    }

    #[test]
    fn test_default_with_4_meetings() {
        assert_eq!(meeting_rooms_ii(&[(0, 30), (5, 10), (15, 20), (2, 7)]), 3);
    }

    #[test]
    fn test_sequential_non_overlapping() {
        assert_eq!(meeting_rooms_ii(&[(0, 5), (5, 10), (10, 15)]), 1);
    }

    #[test]
    fn test_all_overlap() {
        assert_eq!(meeting_rooms_ii(&[(0, 100), (1, 99), (2, 98)]), 3);
    }

    #[test]
    fn test_empty() {
        assert_eq!(meeting_rooms_ii(&[]), 0);
    }

    #[test]
    fn test_single_meeting() {
        assert_eq!(meeting_rooms_ii(&[(0, 30)]), 1);
    }

    #[test]
    fn test_reverse_order() {
        assert_eq!(meeting_rooms_ii(&[(15, 20), (5, 10), (0, 30)]), 2);
    }

    #[test]
    fn test_end_equals_start() {
        assert_eq!(meeting_rooms_ii(&[(0, 10), (10, 20), (10, 30)]), 2);
    }

    #[test]
    fn test_two_identical() {
        assert_eq!(meeting_rooms_ii(&[(0, 5), (0, 5)]), 2);
    }
}
