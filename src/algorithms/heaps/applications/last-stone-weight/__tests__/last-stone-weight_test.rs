include!("../sources/last-stone-weight.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        assert_eq!(last_stone_weight(&[2, 7, 4, 1, 8, 1]), 1);
    }

    #[test]
    fn test_single_stone() {
        assert_eq!(last_stone_weight(&[1]), 1);
    }

    #[test]
    fn test_equal_pair() {
        assert_eq!(last_stone_weight(&[5, 5]), 0);
    }

    #[test]
    fn test_unequal_pair() {
        assert_eq!(last_stone_weight(&[3, 7]), 4);
    }

    #[test]
    fn test_one_three() {
        assert_eq!(last_stone_weight(&[1, 3]), 2);
    }

    #[test]
    fn test_three_equal() {
        assert_eq!(last_stone_weight(&[1, 1, 1]), 1);
    }

    #[test]
    fn test_four_equal() {
        assert_eq!(last_stone_weight(&[4, 4, 4, 4]), 0);
    }

    #[test]
    fn test_10_4_2_10() {
        assert_eq!(last_stone_weight(&[10, 4, 2, 10]), 2);
    }
}
