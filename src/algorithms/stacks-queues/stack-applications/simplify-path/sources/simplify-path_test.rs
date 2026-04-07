include!("simplify-path.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn dot_and_double_dot() {
        assert_eq!(simplify_path("/a/./b/../../c/"), "/c");
    }

    #[test]
    fn trailing_slash_removed() {
        assert_eq!(simplify_path("/home/"), "/home");
    }

    #[test]
    fn navigate_above_root() {
        assert_eq!(simplify_path("/../"), "/");
    }

    #[test]
    fn consecutive_slashes_collapsed() {
        assert_eq!(simplify_path("/home//foo/"), "/home/foo");
    }

    #[test]
    fn lone_slash() {
        assert_eq!(simplify_path("/"), "/");
    }

    #[test]
    fn deeply_nested_no_dots() {
        assert_eq!(simplify_path("/a/b/c/d"), "/a/b/c/d");
    }

    #[test]
    fn multiple_double_dots() {
        assert_eq!(simplify_path("/a/b/../../c/d/../e"), "/c/e");
    }

    #[test]
    fn double_dot_at_root() {
        assert_eq!(simplify_path("/.."), "/");
    }

    #[test]
    fn only_dot_components() {
        assert_eq!(simplify_path("/./././."), "/");
    }
}
