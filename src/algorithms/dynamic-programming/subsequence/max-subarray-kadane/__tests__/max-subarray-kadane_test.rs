include!("../sources/max-subarray-kadane.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classic_kadane_input() { assert_eq!(max_subarray_kadane(&[-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6); }

    #[test]
    fn single_positive() { assert_eq!(max_subarray_kadane(&[1]), 1); }

    #[test]
    fn single_negative() { assert_eq!(max_subarray_kadane(&[-1]), -1); }

    #[test]
    fn mostly_positive() { assert_eq!(max_subarray_kadane(&[5, 4, -1, 7, 8]), 23); }

    #[test]
    fn all_negative() { assert_eq!(max_subarray_kadane(&[-3, -2, -1]), -1); }
}
