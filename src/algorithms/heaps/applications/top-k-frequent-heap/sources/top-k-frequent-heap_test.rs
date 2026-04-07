include!("top-k-frequent-heap.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_k_elements() {
        let result = top_k_frequent_heap(&[1,1,1,2,2,3,3,3,3,4], 2);
        assert_eq!(result.len(), 2);
        assert!(result.contains(&1));
        assert!(result.contains(&3));
    }

    #[test]
    fn test_top1() {
        let result = top_k_frequent_heap(&[4,4,4,4,2,2,1], 1);
        assert_eq!(result, vec![4]);
    }

    #[test]
    fn test_all_same() {
        let result = top_k_frequent_heap(&[9,9,9,9], 1);
        assert_eq!(result, vec![9]);
    }

    #[test]
    fn test_single_element() {
        let result = top_k_frequent_heap(&[3], 1);
        assert_eq!(result, vec![3]);
    }

    #[test]
    fn test_excludes_low_frequency() {
        let result = top_k_frequent_heap(&[1,1,1,2,2,3,3,3,3,4], 2);
        assert!(!result.contains(&4));
    }

    #[test]
    fn test_k3_from_default() {
        let result = top_k_frequent_heap(&[1,1,1,2,2,3,3,3,3,4], 3);
        assert_eq!(result.len(), 3);
        assert!(result.contains(&1));
        assert!(result.contains(&2));
        assert!(result.contains(&3));
    }

    #[test]
    fn test_k_equals_unique_count() {
        let result = top_k_frequent_heap(&[5,5,6,6,7,7], 3);
        assert_eq!(result.len(), 3);
    }
}
