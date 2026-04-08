include!("../sources/min-rotated-array.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_minimum_in_rotated_array() {
        assert_eq!(min_rotated_array(&[4, 5, 6, 7, 0, 1, 2]), 0);
    }

    #[test]
    fn finds_minimum_when_not_rotated() {
        assert_eq!(min_rotated_array(&[1, 2, 3, 4, 5]), 1);
    }

    #[test]
    fn finds_minimum_when_rotation_at_last_position() {
        assert_eq!(min_rotated_array(&[2, 3, 4, 5, 1]), 1);
    }

    #[test]
    fn handles_single_element() {
        assert_eq!(min_rotated_array(&[42]), 42);
    }

    #[test]
    fn handles_two_element_rotated() {
        assert_eq!(min_rotated_array(&[2, 1]), 1);
    }

    #[test]
    fn handles_two_element_not_rotated() {
        assert_eq!(min_rotated_array(&[1, 2]), 1);
    }

    #[test]
    fn finds_minimum_when_min_at_index_zero() {
        assert_eq!(min_rotated_array(&[0, 1, 2, 4, 5, 6, 7]), 0);
    }

    #[test]
    fn finds_minimum_with_larger_rotation_offset() {
        assert_eq!(min_rotated_array(&[11, 13, 15, 17, 2, 5, 6, 7]), 2);
    }

    #[test]
    fn handles_minimum_at_last_position() {
        assert_eq!(min_rotated_array(&[3, 4, 5, 6, 7, 8, 1]), 1);
    }

    #[test]
    fn handles_minimum_at_pivot() {
        assert_eq!(min_rotated_array(&[6, 7, 0, 1, 2, 3, 4, 5]), 0);
    }

    #[test]
    fn handles_three_element_array() {
        assert_eq!(min_rotated_array(&[3, 1, 2]), 1);
    }

    #[test]
    fn handles_minimum_at_middle() {
        assert_eq!(min_rotated_array(&[5, 6, 7, 1, 2, 3, 4]), 1);
    }
}
