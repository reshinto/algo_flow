include!("daily-temperatures.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let result = daily_temperatures(&[73, 74, 75, 71, 69, 72, 76, 73]);
        assert_eq!(result, vec![1, 1, 4, 2, 1, 1, 0, 0]);
    }

    #[test]
    fn test_strictly_decreasing() {
        let result = daily_temperatures(&[5, 4, 3, 2, 1]);
        assert_eq!(result, vec![0, 0, 0, 0, 0]);
    }

    #[test]
    fn test_strictly_increasing() {
        let result = daily_temperatures(&[1, 2, 3, 4, 5]);
        assert_eq!(result, vec![1, 1, 1, 1, 0]);
    }

    #[test]
    fn test_all_equal() {
        let result = daily_temperatures(&[5, 5, 5, 5]);
        assert_eq!(result, vec![0, 0, 0, 0]);
    }

    #[test]
    fn test_single_day() {
        let result = daily_temperatures(&[72]);
        assert_eq!(result, vec![0]);
    }

    #[test]
    fn test_empty_array() {
        let result = daily_temperatures(&[]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_two_days_second_warmer() {
        let result = daily_temperatures(&[60, 70]);
        assert_eq!(result, vec![1, 0]);
    }

    #[test]
    fn test_two_days_second_cooler() {
        let result = daily_temperatures(&[70, 60]);
        assert_eq!(result, vec![0, 0]);
    }

    #[test]
    fn test_increasing_sequence() {
        let result = daily_temperatures(&[30, 40, 50, 60]);
        assert_eq!(result, vec![1, 1, 1, 0]);
    }
}
