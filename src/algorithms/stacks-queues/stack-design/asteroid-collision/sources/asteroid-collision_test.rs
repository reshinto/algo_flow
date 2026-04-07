include!("asteroid-collision.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn smaller_destroyed_by_larger() {
        assert_eq!(asteroid_collision(&[5, 10, -5]), vec![5, 10]);
    }

    #[test]
    fn both_explode_equal_size() {
        assert_eq!(asteroid_collision(&[8, -8]), vec![]);
    }

    #[test]
    fn larger_right_mover_survives() {
        assert_eq!(asteroid_collision(&[10, 2, -5]), vec![10]);
    }

    #[test]
    fn no_collisions_same_direction() {
        assert_eq!(asteroid_collision(&[-2, -1, 1, 2]), vec![-2, -1, 1, 2]);
    }

    #[test]
    fn chain_of_equal_collisions() {
        assert_eq!(asteroid_collision(&[1, -1, 1, -1]), vec![]);
    }

    #[test]
    fn large_left_mover_destroys_all() {
        assert_eq!(asteroid_collision(&[1, 2, 3, -10]), vec![-10]);
    }

    #[test]
    fn two_left_movers_unchanged() {
        assert_eq!(asteroid_collision(&[-5, -3]), vec![-5, -3]);
    }

    #[test]
    fn single_asteroid() {
        assert_eq!(asteroid_collision(&[7]), vec![7]);
    }

    #[test]
    fn empty_input() {
        assert_eq!(asteroid_collision(&[]), vec![]);
    }

    #[test]
    fn chain_reaction() {
        assert_eq!(asteroid_collision(&[5, 3, 1, -4]), vec![5]);
    }
}
