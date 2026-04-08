include!("../sources/lis-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn mixed_sequence() { assert_eq!(lis_length(&[10, 9, 2, 5, 3, 7, 101, 18]), 4); }

    #[test]
    fn interleaved_sequence() { assert_eq!(lis_length(&[0, 1, 0, 3, 2, 3]), 4); }

    #[test]
    fn all_equal() { assert_eq!(lis_length(&[7, 7, 7]), 1); }

    #[test]
    fn single_element() { assert_eq!(lis_length(&[1]), 1); }

    #[test]
    fn empty_sequence() { assert_eq!(lis_length(&[]), 0); }

    #[test]
    fn strictly_ascending() { assert_eq!(lis_length(&[1, 2, 3, 4, 5]), 5); }

    #[test]
    fn strictly_descending() { assert_eq!(lis_length(&[5, 4, 3, 2, 1]), 1); }

    #[test]
    fn strict_increase_with_duplicates() { assert_eq!(lis_length(&[1, 3, 3, 5]), 3); }
}
