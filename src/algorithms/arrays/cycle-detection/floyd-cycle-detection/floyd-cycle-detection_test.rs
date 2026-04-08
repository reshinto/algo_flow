include!("sources/floyd-cycle-detection.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let (has_cycle, cycle_start) = floyd_cycle_detection(&[1, 3, 4, 2, 2]);
        assert!(has_cycle);
        assert_eq!(cycle_start, 2);
    }

    #[test]
    fn test_cycle_start_3() {
        let (has_cycle, cycle_start) = floyd_cycle_detection(&[3, 1, 3, 4, 2]);
        assert!(has_cycle);
        assert_eq!(cycle_start, 3);
    }

    #[test]
    fn test_minimal_cycle() {
        let (has_cycle, cycle_start) = floyd_cycle_detection(&[1, 1]);
        assert!(has_cycle);
        assert_eq!(cycle_start, 1);
    }

    #[test]
    fn test_empty_array() {
        let (has_cycle, cycle_start) = floyd_cycle_detection(&[]);
        assert!(!has_cycle);
        assert_eq!(cycle_start, -1);
    }

    #[test]
    fn test_cycle_start_is_valid_index() {
        let test_cases: Vec<Vec<usize>> = vec![
            vec![1, 3, 4, 2, 2],
            vec![3, 1, 3, 4, 2],
            vec![1, 1],
        ];
        for test_case in test_cases {
            let (has_cycle, cycle_start) = floyd_cycle_detection(&test_case);
            assert!(has_cycle);
            assert!(cycle_start >= 0 && (cycle_start as usize) < test_case.len());
        }
    }
}
