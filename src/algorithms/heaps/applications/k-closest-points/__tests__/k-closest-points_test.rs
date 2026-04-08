include!("../sources/k-closest-points.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn dist_sq(point: (i64, i64)) -> i64 {
        point.0 * point.0 + point.1 * point.1
    }

    #[test]
    fn test_returns_k_closest() {
        let points = vec![(3, 3), (5, -1), (-2, 4), (1, 1), (0, 2), (-1, -1), (4, 0)];
        let result = k_closest_points(&points, 3);
        assert_eq!(result.len(), 3);
        let mut all_dists: Vec<i64> = points.iter().map(|&p| dist_sq(p)).collect();
        all_dists.sort();
        let third_smallest = all_dists[2];
        for point in &result {
            assert!(dist_sq(*point) <= third_smallest);
        }
    }

    #[test]
    fn test_k_equals_1() {
        let points = vec![(10, 10), (1, 0), (5, 5)];
        let result = k_closest_points(&points, 1);
        assert_eq!(result.len(), 1);
        assert_eq!(dist_sq(result[0]), 1);
    }

    #[test]
    fn test_k_equals_all() {
        let points = vec![(1, 2), (3, 4), (0, 1)];
        let result = k_closest_points(&points, 3);
        assert_eq!(result.len(), 3);
    }

    #[test]
    fn test_negative_coordinates() {
        let points = vec![(-3, -4), (-1, -1), (0, -2)];
        let result = k_closest_points(&points, 1);
        assert_eq!(result.len(), 1);
        assert_eq!(dist_sq(result[0]), 2);
    }

    #[test]
    fn test_origin_point() {
        let points = vec![(0, 0), (1, 1), (2, 2)];
        let result = k_closest_points(&points, 1);
        assert_eq!(dist_sq(result[0]), 0);
    }

    #[test]
    fn test_returns_exactly_k() {
        let points = vec![(1, 0), (0, 1), (2, 2), (3, 3), (0, 5)];
        let result = k_closest_points(&points, 2);
        assert_eq!(result.len(), 2);
    }
}
