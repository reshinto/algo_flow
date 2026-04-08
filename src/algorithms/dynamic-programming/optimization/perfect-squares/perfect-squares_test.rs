include!("sources/perfect-squares.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn n12() { assert_eq!(perfect_squares(12usize), 3usize); }

    #[test]
    fn n13() { assert_eq!(perfect_squares(13usize), 2usize); }

    #[test]
    fn n1() { assert_eq!(perfect_squares(1usize), 1usize); }

    #[test]
    fn n4() { assert_eq!(perfect_squares(4usize), 1usize); }

    #[test]
    fn n7() { assert_eq!(perfect_squares(7usize), 4usize); }

    #[test]
    fn n0() { assert_eq!(perfect_squares(0usize), 0usize); }

    #[test]
    fn n9() { assert_eq!(perfect_squares(9usize), 1usize); }

    #[test]
    fn n5() { assert_eq!(perfect_squares(5usize), 2usize); }
}
