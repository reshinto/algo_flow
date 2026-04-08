include!("sources/design-circular-queue.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn enqueue_fills_capacity() {
        assert_eq!(design_circular_queue(&["enqueue 1", "enqueue 2", "enqueue 3"], 3), vec!["true", "true", "true"]);
    }

    #[test]
    fn returns_full_when_over_capacity() {
        assert_eq!(
            design_circular_queue(&["enqueue 1", "enqueue 2", "enqueue 3", "enqueue 4"], 3),
            vec!["true", "true", "true", "full"]
        );
    }

    #[test]
    fn dequeue_from_empty() {
        assert_eq!(design_circular_queue(&["dequeue"], 3), vec!["empty"]);
    }

    #[test]
    fn dequeue_fifo_order() {
        let ops = ["enqueue 1", "enqueue 2", "enqueue 3", "dequeue", "dequeue", "dequeue"];
        assert_eq!(design_circular_queue(&ops, 3), vec!["true", "true", "true", "1", "2", "3"]);
    }

    #[test]
    fn peek_front_and_rear() {
        assert_eq!(
            design_circular_queue(&["enqueue 10", "enqueue 20", "front"], 3),
            vec!["true", "true", "10"]
        );
        assert_eq!(
            design_circular_queue(&["enqueue 10", "enqueue 20", "rear"], 3),
            vec!["true", "true", "20"]
        );
    }

    #[test]
    fn peek_empty_returns_empty() {
        assert_eq!(design_circular_queue(&["front", "rear"], 3), vec!["empty", "empty"]);
    }

    #[test]
    fn wrap_around_enqueue_dequeue() {
        let ops = ["enqueue 1", "enqueue 2", "dequeue", "enqueue 3", "enqueue 4"];
        assert_eq!(design_circular_queue(&ops, 3), vec!["true", "true", "1", "true", "true"]);
    }

    #[test]
    fn capacity_one_queue() {
        let ops = ["enqueue 42", "dequeue", "enqueue 99", "dequeue"];
        assert_eq!(design_circular_queue(&ops, 1), vec!["true", "42", "true", "99"]);
    }
}
