include!("../sources/pascals-triangle.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_single_row_for_num_rows_1() {
        assert_eq!(pascals_triangle(1), vec![vec![1]]);
    }

    #[test]
    fn test_returns_correct_triangle_for_num_rows_2() {
        assert_eq!(pascals_triangle(2), vec![vec![1], vec![1, 1]]);
    }

    #[test]
    fn test_returns_correct_triangle_for_num_rows_3() {
        assert_eq!(pascals_triangle(3), vec![vec![1], vec![1, 1], vec![1, 2, 1]]);
    }

    #[test]
    fn test_returns_correct_triangle_for_num_rows_5() {
        assert_eq!(
            pascals_triangle(5),
            vec![
                vec![1],
                vec![1, 1],
                vec![1, 2, 1],
                vec![1, 3, 3, 1],
                vec![1, 4, 6, 4, 1],
            ]
        );
    }

    #[test]
    fn test_returns_correct_triangle_for_num_rows_6() {
        let result = pascals_triangle(6);
        assert_eq!(result.len(), 6);
        assert_eq!(result[5], vec![1, 5, 10, 10, 5, 1]);
    }

    #[test]
    fn test_inner_cell_is_sum_of_two_above() {
        let result = pascals_triangle(5);
        for row_idx in 2..result.len() {
            let current_row = &result[row_idx];
            let above_row = &result[row_idx - 1];
            for col_idx in 1..current_row.len() - 1 {
                assert_eq!(current_row[col_idx], above_row[col_idx - 1] + above_row[col_idx]);
            }
        }
    }

    #[test]
    fn test_all_edge_cells_are_1() {
        let result = pascals_triangle(6);
        for row in &result {
            assert_eq!(row[0], 1);
            assert_eq!(row[row.len() - 1], 1);
        }
    }

    #[test]
    fn test_row_length_equals_row_index_plus_one() {
        let result = pascals_triangle(5);
        for (row_idx, row) in result.iter().enumerate() {
            assert_eq!(row.len(), row_idx + 1);
        }
    }

    #[test]
    fn test_returns_empty_for_num_rows_0() {
        assert_eq!(pascals_triangle(0), Vec::<Vec<i32>>::new());
    }
}
