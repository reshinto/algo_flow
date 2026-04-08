include!("sources/partition-equal-subset.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_true_for_1_5_11_5() {
        assert!(partition_equal_subset(&[1, 5, 11, 5]));
    }

    #[test]
    fn returns_false_for_1_2_3_5() {
        assert!(!partition_equal_subset(&[1, 2, 3, 5]));
    }

    #[test]
    fn returns_true_for_1_1() {
        assert!(partition_equal_subset(&[1, 1]));
    }

    #[test]
    fn returns_false_for_single_element() {
        assert!(!partition_equal_subset(&[1]));
    }

    #[test]
    fn returns_false_for_odd_sum() {
        assert!(!partition_equal_subset(&[1, 2, 4]));
    }

    #[test]
    fn returns_true_for_equal_halves() {
        assert!(partition_equal_subset(&[3, 3, 3, 3]));
    }

    #[test]
    fn returns_true_for_2_2_1_1() {
        assert!(partition_equal_subset(&[2, 2, 1, 1]));
    }

    #[test]
    fn returns_false_for_1_2_5() {
        assert!(!partition_equal_subset(&[1, 2, 5]));
    }
}
