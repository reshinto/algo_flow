include!("sources/design-circular-deque.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn push_back_fills_capacity() {
        let result = design_circular_deque(&["pushBack 1", "pushBack 2", "pushBack 3"], 3);
        assert_eq!(result, vec!["true", "true", "true"]);
    }

    #[test]
    fn returns_full_when_over_capacity() {
        let result = design_circular_deque(&["pushBack 1", "pushBack 2", "pushBack 3", "pushBack 4"], 3);
        assert_eq!(result, vec!["true", "true", "true", "full"]);
    }

    #[test]
    fn pop_front_from_empty() {
        assert_eq!(design_circular_deque(&["popFront"], 3), vec!["empty"]);
    }

    #[test]
    fn pop_back_from_empty() {
        assert_eq!(design_circular_deque(&["popBack"], 3), vec!["empty"]);
    }

    #[test]
    fn pop_front_fifo_order() {
        let ops = ["pushBack 1", "pushBack 2", "pushBack 3", "popFront", "popFront", "popFront"];
        assert_eq!(design_circular_deque(&ops, 3), vec!["true", "true", "true", "1", "2", "3"]);
    }

    #[test]
    fn push_front_lifo_order() {
        let ops = ["pushFront 1", "pushFront 2", "pushFront 3", "popFront", "popFront", "popFront"];
        assert_eq!(design_circular_deque(&ops, 3), vec!["true", "true", "true", "3", "2", "1"]);
    }

    #[test]
    fn peek_front_and_rear() {
        let ops = ["pushBack 1", "pushFront 2", "peekFront", "peekRear"];
        assert_eq!(design_circular_deque(&ops, 3), vec!["true", "true", "2", "1"]);
    }

    #[test]
    fn peek_from_empty() {
        assert_eq!(design_circular_deque(&["peekFront", "peekRear"], 3), vec!["empty", "empty"]);
    }

    #[test]
    fn push_front_full_returns_full() {
        let result = design_circular_deque(&["pushBack 1", "pushBack 2", "pushFront 0"], 2);
        assert_eq!(result, vec!["true", "true", "full"]);
    }
}
