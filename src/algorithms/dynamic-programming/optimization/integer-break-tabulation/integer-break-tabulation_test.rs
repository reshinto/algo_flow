include!("sources/integer-break-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn n2() { assert_eq!(integer_break_tabulation(2usize), 1usize); }

    #[test]
    fn n3() { assert_eq!(integer_break_tabulation(3usize), 2usize); }

    #[test]
    fn n4() { assert_eq!(integer_break_tabulation(4usize), 4usize); }

    #[test]
    fn n5() { assert_eq!(integer_break_tabulation(5usize), 6usize); }

    #[test]
    fn n6() { assert_eq!(integer_break_tabulation(6usize), 9usize); }

    #[test]
    fn n8() { assert_eq!(integer_break_tabulation(8usize), 18usize); }

    #[test]
    fn n10() { assert_eq!(integer_break_tabulation(10usize), 36usize); }
}
