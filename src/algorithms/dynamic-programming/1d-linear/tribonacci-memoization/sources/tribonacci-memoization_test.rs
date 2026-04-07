include!("tribonacci-memoization.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn trib(target_index: i64) -> i64 {
        tribonacci_memoization(target_index, &mut HashMap::new())
    }

    #[test]
    fn returns_zero_for_t0() {
        assert_eq!(trib(0), 0);
    }

    #[test]
    fn returns_one_for_t1() {
        assert_eq!(trib(1), 1);
    }

    #[test]
    fn returns_one_for_t2() {
        assert_eq!(trib(2), 1);
    }

    #[test]
    fn computes_t4() {
        assert_eq!(trib(4), 4);
    }

    #[test]
    fn computes_t7() {
        assert_eq!(trib(7), 24);
    }

    #[test]
    fn computes_t10() {
        assert_eq!(trib(10), 149);
    }

    #[test]
    fn matches_full_sequence() {
        let expected = [0i64, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149];
        for (target_index, &expected_value) in expected.iter().enumerate() {
            assert_eq!(trib(target_index as i64), expected_value);
        }
    }
}
