include!("../sources/count-bits.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_zero_for_zero() {
        assert_eq!(count_bits(0), vec![0usize]);
    }

    #[test]
    fn returns_correct_for_two() {
        assert_eq!(count_bits(2), vec![0usize, 1, 1]);
    }

    #[test]
    fn returns_correct_for_five() {
        assert_eq!(count_bits(5), vec![0usize, 1, 1, 2, 1, 2]);
    }

    #[test]
    fn last_element_of_fifteen_is_four() {
        let result = count_bits(15);
        assert_eq!(result[15], 4);
    }

    #[test]
    fn length_is_target_plus_one() {
        let result = count_bits(10);
        assert_eq!(result.len(), 11);
    }

    #[test]
    fn first_element_is_always_zero() {
        let result = count_bits(8);
        assert_eq!(result[0], 0);
    }

    #[test]
    fn powers_of_two_have_exactly_one_bit() {
        let result = count_bits(16);
        for power in [1usize, 2, 4, 8, 16] {
            assert_eq!(result[power], 1, "result[{power}] should be 1");
        }
    }

    #[test]
    fn values_below_powers_have_max_bits() {
        let result = count_bits(16);
        assert_eq!(result[7], 3);
        assert_eq!(result[15], 4);
    }
}
