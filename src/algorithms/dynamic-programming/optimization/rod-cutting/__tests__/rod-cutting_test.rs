include!("../sources/rod-cutting.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_input() {
        assert_eq!(rod_cutting(&[1, 5, 8, 9, 10, 17, 17, 20]), 22);
    }

    #[test]
    fn two_prices() {
        assert_eq!(rod_cutting(&[1, 5]), 5);
    }

    #[test]
    fn three_prices() {
        assert_eq!(rod_cutting(&[3, 5, 8]), 9);
    }

    #[test]
    fn single_price() {
        assert_eq!(rod_cutting(&[1]), 1);
    }

    #[test]
    fn empty_prices() {
        assert_eq!(rod_cutting(&[]), 0);
    }

    #[test]
    fn high_single_value() {
        assert_eq!(rod_cutting(&[10]), 10);
    }

    #[test]
    fn unit_cuts_optimal() {
        assert_eq!(rod_cutting(&[3, 1, 1]), 9);
    }

    #[test]
    fn no_cut_optimal() {
        assert_eq!(rod_cutting(&[1, 2, 10]), 10);
    }

    #[test]
    fn uniform_prices() {
        assert_eq!(rod_cutting(&[2, 2, 2]), 6);
    }
}
