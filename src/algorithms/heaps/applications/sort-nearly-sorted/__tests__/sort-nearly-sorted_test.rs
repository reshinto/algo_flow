include!("../sources/sort-nearly-sorted.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_k3() {
        assert_eq!(sort_nearly_sorted(&[6,5,3,2,8,10,9], 3), vec![2,3,5,6,8,9,10]);
    }

    #[test]
    fn test_k0() {
        assert_eq!(sort_nearly_sorted(&[1,2,3,4,5], 0), vec![1,2,3,4,5]);
    }

    #[test]
    fn test_k1() {
        assert_eq!(sort_nearly_sorted(&[2,1,4,3,6,5], 1), vec![1,2,3,4,5,6]);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(sort_nearly_sorted(&[42], 0), vec![42]);
    }

    #[test]
    fn test_two_elements() {
        assert_eq!(sort_nearly_sorted(&[2,1], 1), vec![1,2]);
    }

    #[test]
    fn test_k_equals_length_minus_1() {
        assert_eq!(sort_nearly_sorted(&[5,4,3,2,1], 4), vec![1,2,3,4,5]);
    }

    #[test]
    fn test_duplicates() {
        assert_eq!(sort_nearly_sorted(&[3,3,1,1,2], 2), vec![1,1,2,3,3]);
    }
}
