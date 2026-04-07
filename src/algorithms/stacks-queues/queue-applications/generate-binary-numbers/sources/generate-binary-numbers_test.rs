include!("generate-binary-numbers.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn first_five_binary_numbers() {
        assert_eq!(
            generate_binary_numbers(5),
            vec!["1", "10", "11", "100", "101"]
        );
    }

    #[test]
    fn first_one_binary_number() {
        assert_eq!(generate_binary_numbers(1), vec!["1"]);
    }

    #[test]
    fn first_three_binary_numbers() {
        assert_eq!(generate_binary_numbers(3), vec!["1", "10", "11"]);
    }

    #[test]
    fn returns_empty_for_zero() {
        let empty: Vec<String> = vec![];
        assert_eq!(generate_binary_numbers(0), empty);
    }

    #[test]
    fn correct_count_for_fifteen() {
        assert_eq!(generate_binary_numbers(15).len(), 15);
    }

    #[test]
    fn last_element_for_four_is_100() {
        let result = generate_binary_numbers(4);
        assert_eq!(result.last().unwrap(), "100");
    }

    #[test]
    fn values_match_binary_representation() {
        let result = generate_binary_numbers(7);
        for (idx, binary_str) in result.iter().enumerate() {
            assert_eq!(i64::from_str_radix(binary_str, 2).unwrap(), (idx + 1) as i64);
        }
    }
}
