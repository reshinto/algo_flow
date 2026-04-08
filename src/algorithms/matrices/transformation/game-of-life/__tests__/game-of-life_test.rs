include!("../sources/game-of-life.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_simulates_standard_4x3_example() {
        let mut board = vec![vec![0, 1, 0], vec![0, 0, 1], vec![1, 1, 1], vec![0, 0, 0]];
        let result = game_of_life(&mut board);
        assert_eq!(
            *result,
            vec![vec![0, 0, 0], vec![1, 0, 1], vec![0, 1, 1], vec![0, 1, 0]]
        );
    }

    #[test]
    fn test_all_dead_board_stays_unchanged() {
        let mut board = vec![vec![0, 0, 0], vec![0, 0, 0], vec![0, 0, 0]];
        let result = game_of_life(&mut board);
        assert_eq!(*result, vec![vec![0, 0, 0], vec![0, 0, 0], vec![0, 0, 0]]);
    }

    #[test]
    fn test_all_alive_3x3_overpopulation() {
        let mut board = vec![vec![1, 1, 1], vec![1, 1, 1], vec![1, 1, 1]];
        let result = game_of_life(&mut board);
        assert_eq!(*result, vec![vec![1, 0, 1], vec![0, 0, 0], vec![1, 0, 1]]);
    }

    #[test]
    fn test_1x1_dead_stays_dead() {
        let mut board = vec![vec![0]];
        let result = game_of_life(&mut board);
        assert_eq!(result[0][0], 0);
    }

    #[test]
    fn test_1x1_live_dies_from_underpopulation() {
        let mut board = vec![vec![1]];
        let result = game_of_life(&mut board);
        assert_eq!(result[0][0], 0);
    }

    #[test]
    fn test_2x2_still_life_block() {
        let mut board = vec![vec![0, 0, 0, 0], vec![0, 1, 1, 0], vec![0, 1, 1, 0], vec![0, 0, 0, 0]];
        let result = game_of_life(&mut board);
        assert_eq!(result[1], vec![0, 1, 1, 0]);
        assert_eq!(result[2], vec![0, 1, 1, 0]);
    }

    #[test]
    fn test_vertical_blinker_becomes_horizontal() {
        let mut board = vec![vec![0, 1, 0], vec![0, 1, 0], vec![0, 1, 0]];
        let result = game_of_life(&mut board);
        assert_eq!(*result, vec![vec![0, 0, 0], vec![1, 1, 1], vec![0, 0, 0]]);
    }

    #[test]
    fn test_reproduction_l_shape() {
        let mut board = vec![vec![1, 1, 0], vec![1, 0, 0], vec![0, 0, 0]];
        let result = game_of_life(&mut board);
        assert_eq!(*result, vec![vec![1, 1, 0], vec![1, 1, 0], vec![0, 0, 0]]);
    }
}
