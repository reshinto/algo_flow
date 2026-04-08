include!("sources/fibonacci-memoization.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn fib(target_index: i64) -> i64 {
        fibonacci_memoization(target_index, &mut HashMap::new())
    }

    #[test]
    fn returns_zero_for_f0() {
        assert_eq!(fib(0), 0);
    }

    #[test]
    fn returns_one_for_f1() {
        assert_eq!(fib(1), 1);
    }

    #[test]
    fn returns_one_for_f2() {
        assert_eq!(fib(2), 1);
    }

    #[test]
    fn computes_f8() {
        assert_eq!(fib(8), 21);
    }

    #[test]
    fn computes_f10() {
        assert_eq!(fib(10), 55);
    }

    #[test]
    fn computes_f15() {
        assert_eq!(fib(15), 610);
    }

    #[test]
    fn matches_full_sequence() {
        let expected = [0i64, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        for (target_index, &expected_value) in expected.iter().enumerate() {
            assert_eq!(fib(target_index as i64), expected_value);
        }
    }
}
