include!("valid-sudoku.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn valid_partial_board() -> Vec<Vec<i32>> {
        vec![
            vec![5, 3, 0, 0, 7, 0, 0, 0, 0],
            vec![6, 0, 0, 1, 9, 5, 0, 0, 0],
            vec![0, 9, 8, 0, 0, 0, 0, 6, 0],
            vec![8, 0, 0, 0, 6, 0, 0, 0, 3],
            vec![4, 0, 0, 8, 0, 3, 0, 0, 1],
            vec![7, 0, 0, 0, 2, 0, 0, 0, 6],
            vec![0, 6, 0, 0, 0, 0, 2, 8, 0],
            vec![0, 0, 0, 4, 1, 9, 0, 0, 5],
            vec![0, 0, 0, 0, 8, 0, 0, 7, 9],
        ]
    }

    fn empty_board() -> Vec<Vec<i32>> {
        vec![vec![0; 9]; 9]
    }

    #[test]
    fn test_accepts_valid_partial_board() {
        assert_eq!(valid_sudoku(&valid_partial_board()), true);
    }

    #[test]
    fn test_accepts_empty_board() {
        assert_eq!(valid_sudoku(&empty_board()), true);
    }

    #[test]
    fn test_rejects_duplicate_in_row() {
        let mut board = empty_board();
        board[0][0] = 5;
        board[0][4] = 5;
        assert_eq!(valid_sudoku(&board), false);
    }

    #[test]
    fn test_rejects_duplicate_in_column() {
        let mut board = empty_board();
        board[0][0] = 3;
        board[5][0] = 3;
        assert_eq!(valid_sudoku(&board), false);
    }

    #[test]
    fn test_rejects_duplicate_in_3x3_box() {
        let mut board = empty_board();
        board[0][0] = 7;
        board[2][2] = 7;
        assert_eq!(valid_sudoku(&board), false);
    }

    #[test]
    fn test_accepts_fully_valid_completed_board() {
        let completed_board = vec![
            vec![5, 3, 4, 6, 7, 8, 9, 1, 2],
            vec![6, 7, 2, 1, 9, 5, 3, 4, 8],
            vec![1, 9, 8, 3, 4, 2, 5, 6, 7],
            vec![8, 5, 9, 7, 6, 1, 4, 2, 3],
            vec![4, 2, 6, 8, 5, 3, 7, 9, 1],
            vec![7, 1, 3, 9, 2, 4, 8, 5, 6],
            vec![9, 6, 1, 5, 3, 7, 2, 8, 4],
            vec![2, 8, 7, 4, 1, 9, 6, 3, 5],
            vec![3, 4, 5, 2, 8, 6, 1, 7, 9],
        ];
        assert_eq!(valid_sudoku(&completed_board), true);
    }

    #[test]
    fn test_accepts_board_with_single_filled_cell() {
        let mut board = empty_board();
        board[4][4] = 5;
        assert_eq!(valid_sudoku(&board), true);
    }

    #[test]
    fn test_rejects_same_digit_twice_in_same_box() {
        let mut board = empty_board();
        board[0][1] = 9;
        board[1][2] = 9;
        assert_eq!(valid_sudoku(&board), false);
    }
}
