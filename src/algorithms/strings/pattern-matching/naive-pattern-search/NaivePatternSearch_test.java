/** Correctness tests for the NaivePatternSearch algorithm. */
public class NaivePatternSearch_test {
    public static void main(String[] args) {
        assert NaivePatternSearch.naivePatternSearch("ABCDEF", "ABC") == 0;
        assert NaivePatternSearch.naivePatternSearch("AABAACAADAABAABA", "AABA") == 0;
        assert NaivePatternSearch.naivePatternSearch("XYZABC", "ABC") == 3;
        assert NaivePatternSearch.naivePatternSearch("ABCDEFG", "XYZ") == -1;
        assert NaivePatternSearch.naivePatternSearch("HELLO", "L") == 2;
        assert NaivePatternSearch.naivePatternSearch("HELLO", "Z") == -1;
        assert NaivePatternSearch.naivePatternSearch("HELLO", "") == 0;
        assert NaivePatternSearch.naivePatternSearch("ABCD", "ABCD") == 0;
        assert NaivePatternSearch.naivePatternSearch("AB", "ABCD") == -1;
        assert NaivePatternSearch.naivePatternSearch("AAAAAB", "AAAB") == 2;
        assert NaivePatternSearch.naivePatternSearch("AABAACAADAABAABA", "AABA") == 0;
        assert NaivePatternSearch.naivePatternSearch("AAAAAAB", "AAAAB") == 2;
        System.out.println("All tests passed!");
    }
}
