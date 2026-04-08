include!("sources/tribonacci-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_zero_for_t0() {
        assert_eq!(tribonacci_tabulation(0usize), 0usize);
    }

    #[test]
    fn returns_one_for_t1() {
        assert_eq!(tribonacci_tabulation(1usize), 1usize);
    }

    #[test]
    fn returns_one_for_t2() {
        assert_eq!(tribonacci_tabulation(2usize), 1usize);
    }

    #[test]
    fn computes_t4() {
        assert_eq!(tribonacci_tabulation(4usize), 4usize);
    }

    #[test]
    fn computes_t7() {
        assert_eq!(tribonacci_tabulation(7usize), 24usize);
    }

    #[test]
    fn computes_t10() {
        assert_eq!(tribonacci_tabulation(10usize), 149usize);
    }
}
