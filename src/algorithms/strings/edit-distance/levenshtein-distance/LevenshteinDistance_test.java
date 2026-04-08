/** Correctness tests for the LevenshteinDistance algorithm. */
public class LevenshteinDistance_test {
    public static void main(String[] args) {
        assert LevenshteinDistance.levenshteinDistance("kitten", "sitting") == 3;
        assert LevenshteinDistance.levenshteinDistance("", "abc") == 3;
        assert LevenshteinDistance.levenshteinDistance("abc", "") == 3;
        assert LevenshteinDistance.levenshteinDistance("abc", "abc") == 0;
        assert LevenshteinDistance.levenshteinDistance("", "") == 0;
        assert LevenshteinDistance.levenshteinDistance("cat", "cats") == 1;
        assert LevenshteinDistance.levenshteinDistance("cats", "cat") == 1;
        assert LevenshteinDistance.levenshteinDistance("cat", "bat") == 1;
        assert LevenshteinDistance.levenshteinDistance("abc", "xyz") == 3;
        assert LevenshteinDistance.levenshteinDistance("sunday", "saturday") == 3;
        assert LevenshteinDistance.levenshteinDistance("a", "a") == 0;
        assert LevenshteinDistance.levenshteinDistance("a", "b") == 1;
        assert LevenshteinDistance.levenshteinDistance("aaa", "aa") == 1;
        System.out.println("All tests passed!");
    }
}
