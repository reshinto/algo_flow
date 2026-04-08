include!("../sources/roman-to-integer.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_converts_mcmxciv_to_1994() {
        assert_eq!(roman_to_integer("MCMXCIV"), 1994);
    }

    #[test]
    fn test_converts_iii_to_3() {
        assert_eq!(roman_to_integer("III"), 3);
    }

    #[test]
    fn test_converts_iv_to_4() {
        assert_eq!(roman_to_integer("IV"), 4);
    }

    #[test]
    fn test_converts_ix_to_9() {
        assert_eq!(roman_to_integer("IX"), 9);
    }

    #[test]
    fn test_converts_lviii_to_58() {
        assert_eq!(roman_to_integer("LVIII"), 58);
    }

    #[test]
    fn test_converts_m_to_1000() {
        assert_eq!(roman_to_integer("M"), 1000);
    }

    #[test]
    fn test_converts_mmmdccxlix_to_3749() {
        assert_eq!(roman_to_integer("MMMDCCXLIX"), 3749);
    }

    #[test]
    fn test_converts_xl_to_40() {
        assert_eq!(roman_to_integer("XL"), 40);
    }

    #[test]
    fn test_converts_cd_to_400() {
        assert_eq!(roman_to_integer("CD"), 400);
    }

    #[test]
    fn test_converts_mmmcmxcix_to_3999() {
        assert_eq!(roman_to_integer("MMMCMXCIX"), 3999);
    }
}
