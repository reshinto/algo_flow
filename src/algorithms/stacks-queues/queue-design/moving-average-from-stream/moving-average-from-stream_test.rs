include!("sources/moving-average-from-stream.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn approx(actual: f64, expected: f64, tolerance: f64) -> bool {
        (actual - expected).abs() < tolerance
    }

    #[test]
    fn default_example_k3() {
        let result = moving_average_from_stream(&[1.0, 10.0, 3.0, 5.0], 3);
        assert!(approx(result[0], 1.0, 0.001));
        assert!(approx(result[1], 5.5, 0.001));
        assert!(approx(result[2], 4.667, 0.01));
        assert!(approx(result[3], 6.0, 0.001));
    }

    #[test]
    fn window_size_one() {
        let result = moving_average_from_stream(&[4.0, 7.0, 2.0], 1);
        assert!(approx(result[0], 4.0, 0.001));
        assert!(approx(result[1], 7.0, 0.001));
        assert!(approx(result[2], 2.0, 0.001));
    }

    #[test]
    fn single_value() {
        let result = moving_average_from_stream(&[42.0], 3);
        assert!(approx(result[0], 42.0, 0.001));
    }

    #[test]
    fn stream_shorter_than_window() {
        let result = moving_average_from_stream(&[2.0, 4.0], 5);
        assert!(approx(result[0], 2.0, 0.001));
        assert!(approx(result[1], 3.0, 0.001));
    }

    #[test]
    fn window_size_two() {
        let result = moving_average_from_stream(&[10.0, 20.0, 30.0, 40.0], 2);
        assert!(approx(result[0], 10.0, 0.001));
        assert!(approx(result[1], 15.0, 0.001));
        assert!(approx(result[2], 25.0, 0.001));
        assert!(approx(result[3], 35.0, 0.001));
    }

    #[test]
    fn identical_values() {
        let result = moving_average_from_stream(&[5.0, 5.0, 5.0, 5.0], 3);
        for avg in result {
            assert!(approx(avg, 5.0, 0.001));
        }
    }
}
