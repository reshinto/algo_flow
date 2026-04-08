include!("sources/heap-peek.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_minimum() {
        assert_eq!(heap_peek(&[1,3,5,7,9,8,6]), Some(1));
    }

    #[test]
    fn test_single_element() {
        assert_eq!(heap_peek(&[42]), Some(42));
    }

    #[test]
    fn test_two_element() {
        assert_eq!(heap_peek(&[2,7]), Some(2));
    }

    #[test]
    fn test_idempotent() {
        let heap = &[1,3,5,7];
        assert_eq!(heap_peek(heap), heap_peek(heap));
        assert_eq!(heap_peek(heap), Some(1));
    }

    #[test]
    fn test_larger_heap() {
        assert_eq!(heap_peek(&[1,3,2,7,5,8,4,9,6]), Some(1));
    }
}
