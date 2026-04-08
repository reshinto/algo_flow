include!("../sources/evaluate-reverse-polish.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn evaluates_addition_then_multiplication() {
        assert_eq!(evaluate_reverse_polish(&["2", "1", "+", "3", "*"]), 9);
    }

    #[test]
    fn evaluates_division_then_addition() {
        assert_eq!(evaluate_reverse_polish(&["4", "13", "5", "/", "+"]), 6);
    }

    #[test]
    fn evaluates_complex_leetcode_example() {
        assert_eq!(
            evaluate_reverse_polish(&["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]),
            22
        );
    }

    #[test]
    fn evaluates_single_operand() {
        assert_eq!(evaluate_reverse_polish(&["42"]), 42);
    }

    #[test]
    fn evaluates_simple_addition() {
        assert_eq!(evaluate_reverse_polish(&["3", "4", "+"]), 7);
    }

    #[test]
    fn evaluates_subtraction() {
        assert_eq!(evaluate_reverse_polish(&["10", "3", "-"]), 7);
    }

    #[test]
    fn evaluates_multiplication() {
        assert_eq!(evaluate_reverse_polish(&["5", "6", "*"]), 30);
    }

    #[test]
    fn truncates_division_toward_zero_positive() {
        assert_eq!(evaluate_reverse_polish(&["7", "2", "/"]), 3);
    }

    #[test]
    fn truncates_division_toward_zero_negative() {
        assert_eq!(evaluate_reverse_polish(&["7", "-3", "/"]), -2);
    }

    #[test]
    fn handles_negative_operands() {
        assert_eq!(evaluate_reverse_polish(&["-3", "4", "*"]), -12);
    }

    #[test]
    fn evaluates_chained_expression() {
        assert_eq!(evaluate_reverse_polish(&["2", "3", "+", "4", "1", "-", "*"]), 15);
    }
}
