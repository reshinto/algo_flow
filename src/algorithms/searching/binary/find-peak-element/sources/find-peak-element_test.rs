include!("find-peak-element.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_peak_in_default_example() {
        assert_eq!(find_peak_element(&[1, 3, 20, 4, 1, 0]), 2);
    }

    #[test]
    fn finds_peak_at_first_element_when_strictly_decreasing() {
        assert_eq!(find_peak_element(&[5, 4, 3, 2, 1]), 0);
    }

    #[test]
    fn finds_peak_at_last_element_when_strictly_increasing() {
        assert_eq!(find_peak_element(&[1, 2, 3, 4, 5]), 4);
    }

    #[test]
    fn handles_single_element() {
        assert_eq!(find_peak_element(&[42]), 0);
    }

    #[test]
    fn finds_peak_in_two_element_array_larger_first() {
        assert_eq!(find_peak_element(&[10, 5]), 0);
    }

    #[test]
    fn finds_peak_in_two_element_array_larger_second() {
        assert_eq!(find_peak_element(&[5, 10]), 1);
    }

    #[test]
    fn finds_valid_peak_when_multiple_peaks_exist() {
        let array = [1, 5, 2, 7, 3];
        let peak_index = find_peak_element(&array);
        let peak_value = array[peak_index];
        let left_neighbor = if peak_index > 0 { array[peak_index - 1] } else { i32::MIN };
        let right_neighbor = if peak_index < array.len() - 1 { array[peak_index + 1] } else { i32::MIN };
        assert!(peak_value > left_neighbor);
        assert!(peak_value > right_neighbor);
    }

    #[test]
    fn finds_peak_in_mountain_shaped_array() {
        assert_eq!(find_peak_element(&[1, 2, 3, 5, 3, 2, 1]), 3);
    }

    #[test]
    fn finds_peak_for_descent_from_start() {
        assert_eq!(find_peak_element(&[3, 2, 1]), 0);
    }

    #[test]
    fn returns_valid_peak_for_larger_array() {
        let array = [10, 20, 15, 25, 5, 30, 8];
        let peak_index = find_peak_element(&array);
        let peak_value = array[peak_index];
        let left_neighbor = if peak_index > 0 { array[peak_index - 1] } else { i32::MIN };
        let right_neighbor = if peak_index < array.len() - 1 { array[peak_index + 1] } else { i32::MIN };
        assert!(peak_value > left_neighbor);
        assert!(peak_value > right_neighbor);
    }
}
