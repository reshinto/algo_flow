include!("can-jump.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reachable_with_multiple_paths() { assert_eq!(can_jump(&[2, 3, 1, 1, 4]), true); }

    #[test]
    fn blocked_by_zero() { assert_eq!(can_jump(&[3, 2, 1, 0, 4]), false); }

    #[test]
    fn single_element() { assert_eq!(can_jump(&[0]), true); }

    #[test]
    fn two_elements_reachable() { assert_eq!(can_jump(&[1, 2]), true); }

    #[test]
    fn blocked_at_start() { assert_eq!(can_jump(&[0, 1]), false); }

    #[test]
    fn long_jump_clears_zeros() { assert_eq!(can_jump(&[5, 0, 0, 0, 0, 1]), true); }

    #[test]
    fn all_zeros() { assert_eq!(can_jump(&[0, 0, 0]), false); }

    #[test]
    fn one_step_to_end() { assert_eq!(can_jump(&[1, 0]), true); }
}
