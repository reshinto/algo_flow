include!("../sources/trapping-rain-water.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_classic_example() {
        let (total_water, _) = trapping_rain_water(&[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
        assert_eq!(total_water, 6);
    }

    #[test]
    fn test_empty_array() {
        let (total_water, water_per_index) = trapping_rain_water(&[]);
        assert_eq!(total_water, 0);
        assert_eq!(water_per_index, vec![]);
    }

    #[test]
    fn test_increasing_no_water() {
        let (total_water, _) = trapping_rain_water(&[1, 2, 3, 4, 5]);
        assert_eq!(total_water, 0);
    }

    #[test]
    fn test_decreasing_no_water() {
        let (total_water, _) = trapping_rain_water(&[5, 4, 3, 2, 1]);
        assert_eq!(total_water, 0);
    }

    #[test]
    fn test_simple_valley() {
        let (total_water, water_per_index) = trapping_rain_water(&[3, 0, 3]);
        assert_eq!(total_water, 3);
        assert_eq!(water_per_index[1], 3);
    }

    #[test]
    fn test_asymmetric_walls() {
        let (total_water, _) = trapping_rain_water(&[3, 0, 1]);
        assert_eq!(total_water, 1);
    }

    #[test]
    fn test_all_zeros() {
        let (total_water, _) = trapping_rain_water(&[0, 0, 0]);
        assert_eq!(total_water, 0);
    }

    #[test]
    fn test_per_index_water() {
        let (total_water, water_per_index) = trapping_rain_water(&[0, 1, 0, 2]);
        assert_eq!(water_per_index[2], 1);
        assert_eq!(total_water, 1);
    }

    #[test]
    fn test_multiple_valleys() {
        let (total_water, _) = trapping_rain_water(&[4, 2, 0, 3, 2, 5]);
        assert_eq!(total_water, 9);
    }
}
