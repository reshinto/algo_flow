include!("sources/infix-to-postfix.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn converts_a_plus_b_times_c_minus_d() {
        assert_eq!(infix_to_postfix("a+b*(c-d)"), "a b c d - * +");
    }

    #[test]
    fn converts_simple_addition() {
        assert_eq!(infix_to_postfix("a+b"), "a b +");
    }

    #[test]
    fn converts_parenthesized_addition_times_c() {
        assert_eq!(infix_to_postfix("(a+b)*c"), "a b + c *");
    }

    #[test]
    fn converts_left_associative_addition() {
        assert_eq!(infix_to_postfix("a+b+c"), "a b + c +");
    }

    #[test]
    fn converts_single_operand() {
        assert_eq!(infix_to_postfix("a"), "a");
    }

    #[test]
    fn converts_multiplication_before_addition() {
        assert_eq!(infix_to_postfix("a*b+c"), "a b * c +");
    }

    #[test]
    fn converts_multiplication_binds_tighter() {
        assert_eq!(infix_to_postfix("a+b*c"), "a b c * +");
    }

    #[test]
    fn converts_nested_parentheses() {
        assert_eq!(infix_to_postfix("(a+b)*(c+d)"), "a b + c d + *");
    }

    #[test]
    fn converts_right_deep_nesting() {
        assert_eq!(infix_to_postfix("a+(b+(c+d))"), "a b c d + + +");
    }

    #[test]
    fn handles_all_four_operators() {
        assert_eq!(infix_to_postfix("a+b*c-d/e"), "a b c * + d e / -");
    }
}
