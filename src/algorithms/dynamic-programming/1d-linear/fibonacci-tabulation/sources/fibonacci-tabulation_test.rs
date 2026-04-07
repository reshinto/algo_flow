include!("fibonacci-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_zero_for_f0() {
        assert_eq!(fibonacci_tabulation(0usize), 0usize);
    }

    #[test]
    fn returns_one_for_f1() {
        assert_eq!(fibonacci_tabulation(1usize), 1usize);
    }

    #[test]
    fn returns_one_for_f2() {
        assert_eq!(fibonacci_tabulation(2usize), 1usize);
    }

    #[test]
    fn computes_f8() {
        assert_eq!(fibonacci_tabulation(8usize), 21usize);
    }

    #[test]
    fn computes_f10() {
        assert_eq!(fibonacci_tabulation(10usize), 55usize);
    }

    #[test]
    fn computes_f15() {
        assert_eq!(fibonacci_tabulation(15usize), 610usize);
    }
}
