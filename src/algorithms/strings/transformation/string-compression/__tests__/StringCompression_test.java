/** Correctness tests for the StringCompression algorithm. */
public class StringCompression_test {
    public static void main(String[] args) {
        assert StringCompression.stringCompression("aabcccccaaa").equals("a2b1c5a3");
        assert StringCompression.stringCompression("abc").equals("abc");
        assert StringCompression.stringCompression("").equals("");
        assert StringCompression.stringCompression("a").equals("a");
        assert StringCompression.stringCompression("aa").equals("aa");
        assert StringCompression.stringCompression("aaaaaaa").equals("a7");
        assert StringCompression.stringCompression("aaabbbccc").equals("a3b3c3");
        assert StringCompression.stringCompression("abcd").equals("abcd");
        assert StringCompression.stringCompression("aaaaab").equals("a5b1");
        assert StringCompression.stringCompression("aaabbb").equals("a3b3");
        assert StringCompression.stringCompression("abbbbb").equals("a1b5");
        assert StringCompression.stringCompression("1111222").equals("1423");
        System.out.println("All tests passed!");
    }
}
