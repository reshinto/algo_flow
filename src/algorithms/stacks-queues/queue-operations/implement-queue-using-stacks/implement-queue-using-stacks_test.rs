include!("sources/implement-queue-using-stacks.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn fifo_order_five_elements() {
        assert_eq!(implement_queue_using_stacks(&[1, 2, 3, 4, 5]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn fifo_two_elements() {
        assert_eq!(implement_queue_using_stacks(&[10, 20]), vec![10, 20]);
    }

    #[test]
    fn single_element() {
        assert_eq!(implement_queue_using_stacks(&[42]), vec![42]);
    }

    #[test]
    fn empty_input() {
        assert_eq!(implement_queue_using_stacks(&[]), vec![]);
    }

    #[test]
    fn duplicate_values() {
        assert_eq!(implement_queue_using_stacks(&[7, 7, 7]), vec![7, 7, 7]);
    }

    #[test]
    fn descending_values() {
        assert_eq!(implement_queue_using_stacks(&[5, 4, 3, 2, 1]), vec![5, 4, 3, 2, 1]);
    }

    #[test]
    fn ascending_values() {
        assert_eq!(implement_queue_using_stacks(&[1, 2, 3]), vec![1, 2, 3]);
    }

    #[test]
    fn negative_values() {
        assert_eq!(implement_queue_using_stacks(&[-3, -1, 0, 2]), vec![-3, -1, 0, 2]);
    }
}
