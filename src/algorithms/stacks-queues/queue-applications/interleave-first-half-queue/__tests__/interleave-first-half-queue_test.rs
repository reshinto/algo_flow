include!("../sources/interleave-first-half-queue.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn interleaves_six_elements() {
        assert_eq!(interleave_first_half_queue(&[1, 2, 3, 4, 5, 6]), vec![1, 4, 2, 5, 3, 6]);
    }

    #[test]
    fn interleaves_four_elements() {
        assert_eq!(interleave_first_half_queue(&[1, 2, 3, 4]), vec![1, 3, 2, 4]);
    }

    #[test]
    fn interleaves_two_elements() {
        assert_eq!(interleave_first_half_queue(&[1, 2]), vec![1, 2]);
    }

    #[test]
    fn single_element() {
        assert_eq!(interleave_first_half_queue(&[42]), vec![42]);
    }

    #[test]
    fn empty_queue() {
        assert_eq!(interleave_first_half_queue(&[]), vec![]);
    }

    #[test]
    fn interleaves_eight_elements() {
        assert_eq!(interleave_first_half_queue(&[1, 2, 3, 4, 5, 6, 7, 8]), vec![1, 5, 2, 6, 3, 7, 4, 8]);
    }

    #[test]
    fn correct_length_even() {
        assert_eq!(interleave_first_half_queue(&[10, 20, 30, 40]).len(), 4);
    }
}
