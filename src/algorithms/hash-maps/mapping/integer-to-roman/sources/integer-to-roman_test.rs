include!("integer-to-roman.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_converts_1994_to_mcmxciv() {
        assert_eq!(integer_to_roman(1994), "MCMXCIV");
    }

    #[test]
    fn test_converts_3_to_iii() {
        assert_eq!(integer_to_roman(3), "III");
    }

    #[test]
    fn test_converts_58_to_lviii() {
        assert_eq!(integer_to_roman(58), "LVIII");
    }

    #[test]
    fn test_converts_1_to_i() {
        assert_eq!(integer_to_roman(1), "I");
    }

    #[test]
    fn test_converts_3999_to_mmmcmxcix() {
        assert_eq!(integer_to_roman(3999), "MMMCMXCIX");
    }

    #[test]
    fn test_converts_9_to_ix() {
        assert_eq!(integer_to_roman(9), "IX");
    }

    #[test]
    fn test_converts_40_to_xl() {
        assert_eq!(integer_to_roman(40), "XL");
    }

    #[test]
    fn test_converts_1000_to_m() {
        assert_eq!(integer_to_roman(1000), "M");
    }
}
