include!("../sources/minimum-jumps.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn two_jumps_to_end() { assert_eq!(minimum_jumps(&[2, 3, 1, 1, 4]), 2); }

    #[test]
    fn all_ones() { assert_eq!(minimum_jumps(&[1, 1, 1, 1]), 3); }

    #[test]
    fn two_elements() { assert_eq!(minimum_jumps(&[2, 1]), 1); }

    #[test]
    fn single_element() { assert_eq!(minimum_jumps(&[0]), 0); }

    #[test]
    fn unreachable() { assert_eq!(minimum_jumps(&[1, 0, 1]), -1); }

    #[test]
    fn empty_array() { assert_eq!(minimum_jumps(&[]), 0); }

    #[test]
    fn single_big_jump() { assert_eq!(minimum_jumps(&[5, 1, 1, 1, 1]), 1); }
}
