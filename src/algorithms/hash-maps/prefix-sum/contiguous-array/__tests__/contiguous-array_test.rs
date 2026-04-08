include!("../sources/contiguous-array.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_6_for_default() {
        assert_eq!(contiguous_array(&[0, 1, 0, 1, 1, 0]), 6);
    }

    #[test]
    fn test_returns_2_for_0_1() {
        assert_eq!(contiguous_array(&[0, 1]), 2);
    }

    #[test]
    fn test_returns_2_for_0_1_0() {
        assert_eq!(contiguous_array(&[0, 1, 0]), 2);
    }

    #[test]
    fn test_returns_0_for_all_zeros() {
        assert_eq!(contiguous_array(&[0, 0, 0]), 0);
    }

    #[test]
    fn test_returns_0_for_all_ones() {
        assert_eq!(contiguous_array(&[1, 1, 1]), 0);
    }

    #[test]
    fn test_returns_0_for_empty() {
        assert_eq!(contiguous_array(&[]), 0);
    }

    #[test]
    fn test_returns_4_for_0_0_1_1() {
        assert_eq!(contiguous_array(&[0, 0, 1, 1]), 4);
    }

    #[test]
    fn test_returns_4_for_1_0_1_0_1() {
        assert_eq!(contiguous_array(&[1, 0, 1, 0, 1]), 4);
    }
}
