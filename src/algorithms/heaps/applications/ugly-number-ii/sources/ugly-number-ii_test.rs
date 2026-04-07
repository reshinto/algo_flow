include!("ugly-number-ii.rs");

#[cfg(test)]
mod tests {
    use super::*;

    const UGLY_SEQUENCE: [i64; 15] = [1,2,3,4,5,6,8,9,10,12,15,16,18,20,24];

    #[test]
    fn test_n10() {
        assert_eq!(ugly_number_ii(10), 12);
    }

    #[test]
    fn test_n1() {
        assert_eq!(ugly_number_ii(1), 1);
    }

    #[test]
    fn test_n2() {
        assert_eq!(ugly_number_ii(2), 2);
    }

    #[test]
    fn test_n6() {
        assert_eq!(ugly_number_ii(6), 6);
    }

    #[test]
    fn test_n15() {
        assert_eq!(ugly_number_ii(15), 24);
    }

    #[test]
    fn test_known_sequence() {
        for (idx, &expected) in UGLY_SEQUENCE.iter().enumerate() {
            assert_eq!(ugly_number_ii(idx + 1), expected, "Failed at position {}", idx + 1);
        }
    }
}
