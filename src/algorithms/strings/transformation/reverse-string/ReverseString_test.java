/** Correctness tests for the ReverseString algorithm. */
public class ReverseString_test {
    public static void main(String[] args) {
        assert ReverseString.reverseString("hello").equals("olleh");
        assert ReverseString.reverseString("a").equals("a");
        assert ReverseString.reverseString("").equals("");
        assert ReverseString.reverseString("ab").equals("ba");
        assert ReverseString.reverseString("racecar").equals("racecar");
        assert ReverseString.reverseString("hello world").equals("dlrow olleh");
        assert ReverseString.reverseString("aaaa").equals("aaaa");
        assert ReverseString.reverseString("algorithm").equals("mhtirogla");
        System.out.println("All tests passed!");
    }
}
