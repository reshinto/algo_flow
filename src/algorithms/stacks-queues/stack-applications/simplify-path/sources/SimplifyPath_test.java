// javac SimplifyPath.java SimplifyPath_test.java && java -ea SimplifyPath_test
public class SimplifyPath_test {
    public static void main(String[] args) {
        assert SimplifyPath.simplifyPath("/a/./b/../../c/").equals("/c");
        assert SimplifyPath.simplifyPath("/home/").equals("/home");
        assert SimplifyPath.simplifyPath("/../").equals("/");
        assert SimplifyPath.simplifyPath("/home//foo/").equals("/home/foo");
        assert SimplifyPath.simplifyPath("/").equals("/");
        assert SimplifyPath.simplifyPath("/a/b/c/d").equals("/a/b/c/d");
        assert SimplifyPath.simplifyPath("/a/b/../../c/d/../e").equals("/c/e");
        assert SimplifyPath.simplifyPath("/..").equals("/");
        assert SimplifyPath.simplifyPath("/./././.").equals("/");

        System.out.println("All tests passed!");
    }
}
