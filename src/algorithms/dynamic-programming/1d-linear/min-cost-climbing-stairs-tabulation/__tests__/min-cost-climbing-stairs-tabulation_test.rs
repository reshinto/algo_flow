include!("../sources/min-cost-climbing-stairs-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_zero_for_empty() {
        assert_eq!(min_cost_climbing_stairs_tabulation(&[]), 0);
    }

    #[test]
    fn returns_ten_for_10_15() {
        assert_eq!(min_cost_climbing_stairs_tabulation(&[10, 15]), 10);
    }

    #[test]
    fn returns_fifteen_for_10_15_20() {
        assert_eq!(min_cost_climbing_stairs_tabulation(&[10, 15, 20]), 15);
    }

    #[test]
    fn computes_default_input() {
        assert_eq!(min_cost_climbing_stairs_tabulation(&[10, 15, 20, 5, 25, 10]), 30);
    }

    #[test]
    fn computes_leetcode_example() {
        assert_eq!(min_cost_climbing_stairs_tabulation(&[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]), 6);
    }

    #[test]
    fn returns_zero_for_single_element() {
        assert_eq!(min_cost_climbing_stairs_tabulation(&[5]), 0);
    }
}
