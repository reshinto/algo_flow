include!("sources/climbing-stairs-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_one_for_zero_stairs() {
        assert_eq!(climbing_stairs_tabulation(0usize), 1usize);
    }

    #[test]
    fn returns_one_for_one_stair() {
        assert_eq!(climbing_stairs_tabulation(1usize), 1usize);
    }

    #[test]
    fn returns_two_for_two_stairs() {
        assert_eq!(climbing_stairs_tabulation(2usize), 2usize);
    }

    #[test]
    fn returns_three_for_three_stairs() {
        assert_eq!(climbing_stairs_tabulation(3usize), 3usize);
    }

    #[test]
    fn returns_five_for_four_stairs() {
        assert_eq!(climbing_stairs_tabulation(4usize), 5usize);
    }

    #[test]
    fn returns_thirteen_for_six_stairs() {
        assert_eq!(climbing_stairs_tabulation(6usize), 13usize);
    }

    #[test]
    fn returns_twenty_one_for_seven_stairs() {
        assert_eq!(climbing_stairs_tabulation(7usize), 21usize);
    }
}
