include!("largest-rectangle-histogram.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let (max_area, left_index, right_index, height) =
            largest_rectangle_histogram(&[2, 1, 5, 6, 2, 3]);
        assert_eq!(max_area, 10);
        assert_eq!(left_index, 2);
        assert_eq!(right_index, 3);
        assert_eq!(height, 5);
    }

    #[test]
    fn test_empty_array() {
        let (max_area, left_index, right_index, _) = largest_rectangle_histogram(&[]);
        assert_eq!(max_area, 0);
        assert_eq!(left_index, -1);
        assert_eq!(right_index, -1);
    }

    #[test]
    fn test_single_bar() {
        let (max_area, left_index, right_index, height) = largest_rectangle_histogram(&[5]);
        assert_eq!(max_area, 5);
        assert_eq!(left_index, 0);
        assert_eq!(right_index, 0);
        assert_eq!(height, 5);
    }

    #[test]
    fn test_all_equal_bars() {
        let (max_area, _, _, _) = largest_rectangle_histogram(&[3, 3, 3, 3]);
        assert_eq!(max_area, 12);
    }

    #[test]
    fn test_strictly_increasing() {
        let (max_area, _, _, _) = largest_rectangle_histogram(&[1, 2, 3, 4, 5]);
        assert_eq!(max_area, 9);
    }

    #[test]
    fn test_strictly_decreasing() {
        let (max_area, _, _, _) = largest_rectangle_histogram(&[5, 4, 3, 2, 1]);
        assert_eq!(max_area, 9);
    }

    #[test]
    fn test_valley_shape() {
        let (max_area, _, _, _) = largest_rectangle_histogram(&[5, 0, 5]);
        assert_eq!(max_area, 5);
    }

    #[test]
    fn test_two_tall_bars() {
        let (max_area, _, _, _) = largest_rectangle_histogram(&[6, 6]);
        assert_eq!(max_area, 12);
    }

    #[test]
    fn test_spike_in_middle() {
        let (max_area, _, _, _) = largest_rectangle_histogram(&[2, 10, 2]);
        assert_eq!(max_area, 10);
    }
}
