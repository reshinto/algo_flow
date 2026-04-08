include!("../sources/cuckoo-filter.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_all_inserted_elements() {
        let results = cuckoo_filter(&[3, 7, 11, 15], &[3, 7, 11, 15], 32);
        for entry in &results {
            assert!(entry.found, "expected found=true for element {}", entry.value);
        }
    }

    #[test]
    fn returns_result_entry_for_every_query() {
        let queries = vec![1, 2, 3, 4, 5];
        let results = cuckoo_filter(&[1, 3], &queries, 8);
        assert_eq!(results.len(), queries.len());
        for (query_idx, query) in queries.iter().enumerate() {
            assert_eq!(results[query_idx].value, *query);
        }
    }

    #[test]
    fn empty_elements_all_queries_not_found() {
        let results = cuckoo_filter(&[], &[5, 10, 15], 8);
        for entry in &results {
            assert!(!entry.found, "expected found=false for empty filter");
        }
    }

    #[test]
    fn empty_queries_returns_empty_results() {
        let results = cuckoo_filter(&[1, 2, 3], &[], 8);
        assert!(results.is_empty());
    }

    #[test]
    fn single_element_and_single_matching_query() {
        let results = cuckoo_filter(&[42], &[42], 16);
        assert!(results[0].found);
    }

    #[test]
    fn correct_structure_shape() {
        let results = cuckoo_filter(&[5], &[5, 99], 8);
        assert_eq!(results.len(), 2);
        // value field is typed as i32, found as bool — compilation guarantees correct types
    }

    #[test]
    fn large_bucket_count() {
        let elements = vec![100, 200, 300];
        let results = cuckoo_filter(&elements, &elements, 1024);
        for entry in &results {
            assert!(entry.found);
        }
    }
}
