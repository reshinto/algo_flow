include!("../sources/bloom-filter.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_results_for_default_input() {
        let results = bloom_filter(&[3, 7, 11, 15], &[3, 5, 7, 9, 11], 16, 3);
        assert_eq!(results.len(), 5);
    }

    #[test]
    fn no_false_negatives_for_inserted_elements() {
        let inserted = vec![3, 7, 11, 15];
        let results = bloom_filter(&inserted, &inserted, 16, 3);
        for entry in &results {
            assert!(entry.found, "expected found=true for inserted element {}", entry.value);
        }
    }

    #[test]
    fn no_insertions_all_queries_not_found() {
        let results = bloom_filter(&[], &[1, 2, 3, 4, 5], 16, 3);
        for entry in &results {
            assert!(!entry.found, "expected found=false for empty filter");
        }
    }

    #[test]
    fn inserted_elements_are_found() {
        let results = bloom_filter(&[3, 7, 11, 15], &[3, 5, 7, 9, 11], 16, 3);
        let found_values: Vec<i32> = results.iter().filter(|r| r.found).map(|r| r.value).collect();
        assert!(found_values.contains(&3));
        assert!(found_values.contains(&7));
        assert!(found_values.contains(&11));
    }

    #[test]
    fn preserves_query_order() {
        let queries = vec![3, 5, 7, 9, 11];
        let results = bloom_filter(&[3, 7, 11, 15], &queries, 16, 3);
        for (query_idx, query) in queries.iter().enumerate() {
            assert_eq!(results[query_idx].value, *query);
        }
    }

    #[test]
    fn single_inserted_element_found() {
        let results = bloom_filter(&[42], &[42], 16, 3);
        assert!(results[0].found);
    }

    #[test]
    fn empty_queries_returns_empty_results() {
        let results = bloom_filter(&[3, 7, 11], &[], 16, 3);
        assert!(results.is_empty());
    }

    #[test]
    fn larger_bit_array_no_false_negatives() {
        let elements = vec![100, 200, 300];
        let results = bloom_filter(&elements, &elements, 512, 5);
        for entry in &results {
            assert!(entry.found);
        }
    }
}
