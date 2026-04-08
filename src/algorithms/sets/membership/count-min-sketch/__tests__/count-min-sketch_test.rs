include!("../sources/count-min-sketch.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_results_for_inserted_elements() {
        let results = count_min_sketch(&[3, 3, 7, 7, 7, 11], &[3, 7, 11, 5], 8, 3);
        let found_values: Vec<i32> = results.iter().map(|r| r.value).collect();
        assert!(found_values.contains(&3));
        assert!(found_values.contains(&7));
        assert!(found_values.contains(&11));
    }

    #[test]
    fn does_not_return_result_for_non_inserted_element() {
        let results = count_min_sketch(&[3, 3, 7, 7, 7, 11], &[3, 7, 11, 5], 8, 3);
        let found_values: Vec<i32> = results.iter().map(|r| r.value).collect();
        assert!(!found_values.contains(&5));
    }

    #[test]
    fn estimated_count_for_element_7_at_least_3() {
        let results = count_min_sketch(&[3, 3, 7, 7, 7, 11], &[7], 8, 3);
        let entry = results.iter().find(|r| r.value == 7).unwrap();
        assert!(entry.estimated_count >= 3);
    }

    #[test]
    fn estimated_count_for_element_3_at_least_2() {
        let results = count_min_sketch(&[3, 3, 7, 7, 7, 11], &[3], 8, 3);
        let entry = results.iter().find(|r| r.value == 3).unwrap();
        assert!(entry.estimated_count >= 2);
    }

    #[test]
    fn empty_elements_returns_empty_results() {
        let results = count_min_sketch(&[], &[3, 7], 8, 3);
        assert!(results.is_empty());
    }

    #[test]
    fn empty_queries_returns_empty_results() {
        let results = count_min_sketch(&[3, 3, 7], &[], 8, 3);
        assert!(results.is_empty());
    }

    #[test]
    fn depth_of_1() {
        let results = count_min_sketch(&[5, 5, 5], &[5], 16, 1);
        let entry = results.iter().find(|r| r.value == 5).unwrap();
        assert!(entry.estimated_count >= 3);
    }

    #[test]
    fn never_undercounts() {
        let results = count_min_sketch(&[1, 1, 1, 2, 2, 3], &[1, 2, 3], 16, 4);
        let count_of_1 = results.iter().find(|r| r.value == 1).map(|r| r.estimated_count).unwrap_or(0);
        let count_of_2 = results.iter().find(|r| r.value == 2).map(|r| r.estimated_count).unwrap_or(0);
        let count_of_3 = results.iter().find(|r| r.value == 3).map(|r| r.estimated_count).unwrap_or(0);
        assert!(count_of_1 >= 3);
        assert!(count_of_2 >= 2);
        assert!(count_of_3 >= 1);
    }

    #[test]
    fn single_element_inserted_once() {
        let results = count_min_sketch(&[42], &[42], 8, 3);
        assert_eq!(results.len(), 1);
        assert!(results[0].estimated_count >= 1);
    }
}
