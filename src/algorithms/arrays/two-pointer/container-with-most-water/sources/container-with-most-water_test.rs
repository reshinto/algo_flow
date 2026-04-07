include!("container-with-most-water.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let (max_area, _, _) = container_with_most_water(&[1, 8, 6, 2, 5, 4, 8, 3, 7]);
        assert_eq!(max_area, 49);
    }

    #[test]
    fn test_two_equal_bars() {
        let (max_area, _, _) = container_with_most_water(&[1, 1]);
        assert_eq!(max_area, 1);
    }

    #[test]
    fn test_all_equal_bars() {
        let (max_area, _, _) = container_with_most_water(&[5, 5, 5, 5]);
        assert_eq!(max_area, 15);
    }

    #[test]
    fn test_single_element() {
        let (max_area, _, _) = container_with_most_water(&[7]);
        assert_eq!(max_area, 0);
    }

    #[test]
    fn test_empty_array() {
        let (max_area, _, _) = container_with_most_water(&[]);
        assert_eq!(max_area, 0);
    }

    #[test]
    fn test_monotonically_increasing() {
        let (max_area, _, _) = container_with_most_water(&[1, 2, 3, 4, 5]);
        assert_eq!(max_area, 6);
    }

    #[test]
    fn test_monotonically_decreasing() {
        let (max_area, _, _) = container_with_most_water(&[5, 4, 3, 2, 1]);
        assert_eq!(max_area, 6);
    }

    #[test]
    fn test_area_at_indices_matches_max() {
        let heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
        let (max_area, left_index, right_index) = container_with_most_water(&heights);
        let computed_area =
            heights[left_index].min(heights[right_index]) * (right_index - left_index) as i32;
        assert_eq!(computed_area, max_area);
    }
}
