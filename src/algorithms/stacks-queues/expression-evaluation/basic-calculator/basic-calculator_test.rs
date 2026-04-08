include!("sources/basic-calculator.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn evaluates_simple_addition() {
        assert_eq!(basic_calculator("1 + 1"), 2);
    }

    #[test]
    fn evaluates_mixed_addition_and_subtraction_with_spaces() {
        assert_eq!(basic_calculator(" 2-1 + 2 "), 3);
    }

    #[test]
    fn evaluates_complex_nested_expression() {
        assert_eq!(basic_calculator("(1+(4+5+2)-3)+(6+8)"), 23);
    }

    #[test]
    fn evaluates_default_input() {
        assert_eq!(basic_calculator("1 + (2 - 3)"), 0);
    }

    #[test]
    fn evaluates_single_positive_number() {
        assert_eq!(basic_calculator("42"), 42);
    }

    #[test]
    fn evaluates_simple_subtraction() {
        assert_eq!(basic_calculator("10 - 3"), 7);
    }

    #[test]
    fn evaluates_deeply_nested_parentheses() {
        assert_eq!(basic_calculator("(((1 + 2)))"), 3);
    }

    #[test]
    fn handles_negative_result_from_subtraction_inside_parentheses() {
        assert_eq!(basic_calculator("1 - (2 + 3)"), -4);
    }
}
