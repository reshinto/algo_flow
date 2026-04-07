include!("integer-break-memoization.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn ibreak(target_number: i64) -> i64 {
        integer_break_memoization(target_number, &mut HashMap::new())
    }

    #[test]
    fn n2() { assert_eq!(ibreak(2), 1); }

    #[test]
    fn n3() { assert_eq!(ibreak(3), 2); }

    #[test]
    fn n4() { assert_eq!(ibreak(4), 4); }

    #[test]
    fn n5() { assert_eq!(ibreak(5), 6); }

    #[test]
    fn n6() { assert_eq!(ibreak(6), 9); }

    #[test]
    fn n8() { assert_eq!(ibreak(8), 18); }

    #[test]
    fn n10() { assert_eq!(ibreak(10), 36); }

    #[test]
    fn n13() { assert_eq!(ibreak(13), 108); }
}
