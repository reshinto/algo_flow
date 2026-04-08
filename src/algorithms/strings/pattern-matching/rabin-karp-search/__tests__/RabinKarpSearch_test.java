/** Correctness tests for the RabinKarpSearch algorithm. */
public class RabinKarpSearch_test {
    public static void main(String[] args) {
        assert RabinKarpSearch.rabinKarpSearch("ABCDEF", "ABC") == 0;
        assert RabinKarpSearch.rabinKarpSearch("GEEKS FOR GEEKS", "GEEK") == 0;
        assert RabinKarpSearch.rabinKarpSearch("XYZABC", "ABC") == 3;
        assert RabinKarpSearch.rabinKarpSearch("ABCDEFG", "XYZ") == -1;
        assert RabinKarpSearch.rabinKarpSearch("HELLO", "L") == 2;
        assert RabinKarpSearch.rabinKarpSearch("HELLO", "Z") == -1;
        assert RabinKarpSearch.rabinKarpSearch("HELLO", "") == 0;
        assert RabinKarpSearch.rabinKarpSearch("ABCD", "ABCD") == 0;
        assert RabinKarpSearch.rabinKarpSearch("AB", "ABCD") == -1;
        assert RabinKarpSearch.rabinKarpSearch("AAAAAB", "AAAB") == 2;
        assert RabinKarpSearch.rabinKarpSearch("ABABCABAB", "ABABCABAB") == 0;
        assert RabinKarpSearch.rabinKarpSearch("GEEKS FOR GEEKS", "FOR") == 6;
        System.out.println("All tests passed!");
    }
}
