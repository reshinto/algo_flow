public class ReorganizeString_test {
    private static boolean hasAdjacentDuplicates(String str) {
        for (int idx = 1; idx < str.length(); idx++) {
            if (str.charAt(idx) == str.charAt(idx - 1)) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        // Test: "aabbc" — valid reorganization exists
        String result1 = ReorganizeString.reorganizeString("aabbc");
        assert result1.length() == 5 : "Test 1 failed: length";
        assert !hasAdjacentDuplicates(result1) : "Test 1 failed: adjacent duplicates";

        // Test: "aaab" — impossible
        assert ReorganizeString.reorganizeString("aaab").equals("") : "Test 2 failed";

        // Test: single character
        assert ReorganizeString.reorganizeString("a").equals("a") : "Test 3 failed";

        // Test: two different characters
        String result4 = ReorganizeString.reorganizeString("ab");
        assert result4.length() == 2 : "Test 4 failed: length";
        assert !hasAdjacentDuplicates(result4) : "Test 4 failed: adjacent duplicates";

        // Test: "aab"
        String result5 = ReorganizeString.reorganizeString("aab");
        assert result5.length() == 3 : "Test 5 failed: length";
        assert !hasAdjacentDuplicates(result5) : "Test 5 failed: adjacent duplicates";

        // Test: "aaa" — impossible
        assert ReorganizeString.reorganizeString("aaa").equals("") : "Test 6 failed";

        // Test: "aa" — impossible
        assert ReorganizeString.reorganizeString("aa").equals("") : "Test 7 failed";

        // Test: all unique characters "abcde"
        String result8 = ReorganizeString.reorganizeString("abcde");
        assert result8.length() == 5 : "Test 8 failed: length";
        assert !hasAdjacentDuplicates(result8) : "Test 8 failed: adjacent duplicates";

        System.out.println("All tests passed!");
    }
}
