include!("sources/search-rotated-array.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_target_in_rotated_array() {
        assert_eq!(search_rotated_array(&[4, 5, 6, 7, 0, 1, 2], 0), 4);
    }

    #[test]
    fn finds_target_in_left_sorted_half() {
        assert_eq!(search_rotated_array(&[4, 5, 6, 7, 0, 1, 2], 5), 1);
    }

    #[test]
    fn finds_target_in_right_sorted_half() {
        assert_eq!(search_rotated_array(&[4, 5, 6, 7, 0, 1, 2], 1), 5);
    }

    #[test]
    fn returns_minus_one_when_not_found() {
        assert_eq!(search_rotated_array(&[4, 5, 6, 7, 0, 1, 2], 3), -1);
    }

    #[test]
    fn finds_target_in_non_rotated_array() {
        assert_eq!(search_rotated_array(&[1, 2, 3, 4, 5, 6, 7], 4), 3);
    }

    #[test]
    fn finds_target_at_rotation_pivot() {
        assert_eq!(search_rotated_array(&[6, 7, 0, 1, 2, 3, 4, 5], 6), 0);
    }

    #[test]
    fn single_element_found() {
        assert_eq!(search_rotated_array(&[5], 5), 0);
    }

    #[test]
    fn single_element_not_found() {
        assert_eq!(search_rotated_array(&[5], 3), -1);
    }

    #[test]
    fn finds_target_at_last_index() {
        assert_eq!(search_rotated_array(&[3, 4, 5, 1, 2], 2), 4);
    }

    #[test]
    fn finds_target_at_first_index() {
        assert_eq!(search_rotated_array(&[3, 4, 5, 1, 2], 3), 0);
    }

    #[test]
    fn handles_two_element_rotated_array() {
        assert_eq!(search_rotated_array(&[2, 1], 1), 1);
    }

    #[test]
    fn handles_two_element_finding_first() {
        assert_eq!(search_rotated_array(&[2, 1], 2), 0);
    }

    #[test]
    fn returns_minus_one_for_empty_array() {
        assert_eq!(search_rotated_array(&[], 5), -1);
    }
}
