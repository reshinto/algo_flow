include!("../sources/lis-memoization.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_sequence() { assert_eq!(lis_memoization(&[]), 0); }

    #[test]
    fn single_element() { assert_eq!(lis_memoization(&[42]), 1); }

    #[test]
    fn strictly_descending() { assert_eq!(lis_memoization(&[5, 4, 3, 2, 1]), 1); }

    #[test]
    fn strictly_ascending() { assert_eq!(lis_memoization(&[1, 2, 3, 4, 5]), 5); }

    #[test]
    fn mixed_sequence() { assert_eq!(lis_memoization(&[10, 9, 2, 5, 3, 7, 101, 18]), 4); }

    #[test]
    fn partial_increasing() { assert_eq!(lis_memoization(&[3, 10, 2, 1, 20]), 3); }

    #[test]
    fn two_descending() { assert_eq!(lis_memoization(&[3, 2]), 1); }

    #[test]
    fn non_consecutive_increase() { assert_eq!(lis_memoization(&[50, 3, 10, 7, 40, 80]), 4); }

    #[test]
    fn all_equal() { assert_eq!(lis_memoization(&[7, 7, 7, 7]), 1); }

    #[test]
    fn longer_sequence() { assert_eq!(lis_memoization(&[1, 3, 6, 7, 9, 4, 10, 5, 6]), 6); }
}
