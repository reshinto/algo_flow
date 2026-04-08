/** Correctness tests for the BoyerMooreSearch algorithm. */
public class BoyerMooreSearch_test {
    public static void main(String[] args) {
        assert BoyerMooreSearch.boyerMooreSearch("ABCDEF", "ABC") == 0;
        assert BoyerMooreSearch.boyerMooreSearch("ABAAABCD", "ABC") == 4;
        assert BoyerMooreSearch.boyerMooreSearch("XYZABC", "ABC") == 3;
        assert BoyerMooreSearch.boyerMooreSearch("ABCDEFG", "XYZ") == -1;
        assert BoyerMooreSearch.boyerMooreSearch("HELLO", "L") == 2;
        assert BoyerMooreSearch.boyerMooreSearch("HELLO", "Z") == -1;
        assert BoyerMooreSearch.boyerMooreSearch("HELLO", "") == 0;
        assert BoyerMooreSearch.boyerMooreSearch("ABCD", "ABCD") == 0;
        assert BoyerMooreSearch.boyerMooreSearch("AB", "ABCD") == -1;
        assert BoyerMooreSearch.boyerMooreSearch("AAAAABCD", "ABCD") == 4;
        assert BoyerMooreSearch.boyerMooreSearch("GCATCGCAGAGAGTATACAGTACG", "GCAGAGAG") == 5;
        assert BoyerMooreSearch.boyerMooreSearch("ABCDEFGHIJK", "DEF") == 3;
        System.out.println("All tests passed!");
    }
}
