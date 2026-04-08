/** Correctness tests for the JaroWinklerSimilarity algorithm. */
public class JaroWinklerSimilarity_test {
    public static void main(String[] args) {
        assert Math.abs(JaroWinklerSimilarity.jaroWinklerSimilarity("martha", "marhta") - 0.9611) < 0.0001;
        assert JaroWinklerSimilarity.jaroWinklerSimilarity("abc", "abc") == 1.0;
        assert JaroWinklerSimilarity.jaroWinklerSimilarity("", "") == 1.0;
        assert JaroWinklerSimilarity.jaroWinklerSimilarity("", "abc") == 0.0;
        assert JaroWinklerSimilarity.jaroWinklerSimilarity("abc", "") == 0.0;
        assert JaroWinklerSimilarity.jaroWinklerSimilarity("abc", "xyz") == 0.0;

        double crateTrace = JaroWinklerSimilarity.jaroWinklerSimilarity("CRATE", "TRACE");
        assert crateTrace > 0.7 && crateTrace < 0.8 : "Expected score between 0.7 and 0.8, got: " + crateTrace;

        double dwayneDuane = JaroWinklerSimilarity.jaroWinklerSimilarity("DwAyNE", "DuANE");
        assert dwayneDuane >= 0.84 : "Expected >= 0.84, got: " + dwayneDuane;

        assert JaroWinklerSimilarity.jaroWinklerSimilarity("a", "a") == 1.0;

        double algoScore = JaroWinklerSimilarity.jaroWinklerSimilarity("algorithm", "logarithm");
        assert algoScore >= 0.0 && algoScore <= 1.0;

        double forward = JaroWinklerSimilarity.jaroWinklerSimilarity("martha", "marhta");
        double backward = JaroWinklerSimilarity.jaroWinklerSimilarity("marhta", "martha");
        assert forward == backward;

        double withPrefix = JaroWinklerSimilarity.jaroWinklerSimilarity("JOHNSON", "JHNSON");
        double withoutPrefix = JaroWinklerSimilarity.jaroWinklerSimilarity("AOHNSON", "JHNSON");
        assert withPrefix > withoutPrefix;

        double fourPrefix = JaroWinklerSimilarity.jaroWinklerSimilarity("abcdefgh", "abcdXXXX");
        double threePrefix = JaroWinklerSimilarity.jaroWinklerSimilarity("abcXefgh", "abcdXXXX");
        assert fourPrefix > threePrefix;

        System.out.println("All tests passed!");
    }
}
