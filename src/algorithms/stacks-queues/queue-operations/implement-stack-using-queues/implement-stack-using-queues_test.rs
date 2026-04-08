include!("sources/implement-stack-using-queues.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn lifo_order_five_elements() {
        assert_eq!(implement_stack_using_queues(&[1, 2, 3, 4, 5]), vec![5, 4, 3, 2, 1]);
    }

    #[test]
    fn lifo_two_elements() {
        assert_eq!(implement_stack_using_queues(&[10, 20]), vec![20, 10]);
    }

    #[test]
    fn single_element() {
        assert_eq!(implement_stack_using_queues(&[42]), vec![42]);
    }

    #[test]
    fn empty_input() {
        assert_eq!(implement_stack_using_queues(&[]), vec![]);
    }

    #[test]
    fn duplicate_values() {
        assert_eq!(implement_stack_using_queues(&[7, 7, 7]), vec![7, 7, 7]);
    }

    #[test]
    fn descending_becomes_ascending() {
        assert_eq!(implement_stack_using_queues(&[5, 4, 3, 2, 1]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn ascending_becomes_descending() {
        assert_eq!(implement_stack_using_queues(&[1, 2, 3]), vec![3, 2, 1]);
    }

    #[test]
    fn negative_values() {
        assert_eq!(implement_stack_using_queues(&[-3, -1, 0, 2]), vec![2, 0, -1, -3]);
    }
}
