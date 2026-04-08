include!("sources/spiral-matrix-ii.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generates_1x1_matrix() {
        assert_eq!(spiral_matrix_ii(1), vec![vec![1]]);
    }

    #[test]
    fn test_generates_2x2_matrix() {
        assert_eq!(spiral_matrix_ii(2), vec![vec![1, 2], vec![4, 3]]);
    }

    #[test]
    fn test_generates_3x3_matrix() {
        assert_eq!(
            spiral_matrix_ii(3),
            vec![vec![1, 2, 3], vec![8, 9, 4], vec![7, 6, 5]]
        );
    }

    #[test]
    fn test_generates_4x4_matrix() {
        assert_eq!(
            spiral_matrix_ii(4),
            vec![
                vec![1, 2, 3, 4],
                vec![12, 13, 14, 5],
                vec![11, 16, 15, 6],
                vec![10, 9, 8, 7],
            ]
        );
    }

    #[test]
    fn test_generates_5x5_matrix() {
        let result = spiral_matrix_ii(5);
        assert_eq!(result[0], vec![1, 2, 3, 4, 5]);
        assert_eq!(result[1], vec![16, 17, 18, 19, 6]);
        assert_eq!(result[2], vec![15, 24, 25, 20, 7]);
        assert_eq!(result[3], vec![14, 23, 22, 21, 8]);
        assert_eq!(result[4], vec![13, 12, 11, 10, 9]);
    }

    #[test]
    fn test_places_1_in_top_left_corner() {
        for size in [2, 3, 4, 5] {
            let result = spiral_matrix_ii(size);
            assert_eq!(result[0][0], 1);
        }
    }

    #[test]
    fn test_places_n_squared_in_center_for_odd_n() {
        let result = spiral_matrix_ii(3);
        let center = 3 / 2;
        assert_eq!(result[center][center], 9);
    }

    #[test]
    fn test_contains_all_values_1_to_n_squared_for_n4() {
        let result = spiral_matrix_ii(4);
        let flat: Vec<i32> = result.into_iter().flatten().collect();
        assert_eq!(flat.len(), 16);
        let unique: std::collections::HashSet<i32> = flat.iter().cloned().collect();
        assert_eq!(unique.len(), 16);
    }

    #[test]
    fn test_produces_square_matrix_with_correct_dimensions() {
        let result = spiral_matrix_ii(4);
        assert_eq!(result.len(), 4);
        for row in &result {
            assert_eq!(row.len(), 4);
        }
    }
}
