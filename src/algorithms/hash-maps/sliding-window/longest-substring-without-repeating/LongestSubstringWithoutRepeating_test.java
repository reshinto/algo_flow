public class LongestSubstringWithoutRepeating_test {
    public static void main(String[] args) {
        assert LongestSubstringWithoutRepeating.longestSubstringWithoutRepeating("abcabcbb") == 3;
        assert LongestSubstringWithoutRepeating.longestSubstringWithoutRepeating("bbbbb") == 1;
        assert LongestSubstringWithoutRepeating.longestSubstringWithoutRepeating("pwwkew") == 3;
        assert LongestSubstringWithoutRepeating.longestSubstringWithoutRepeating("") == 0;
        assert LongestSubstringWithoutRepeating.longestSubstringWithoutRepeating("a") == 1;
        assert LongestSubstringWithoutRepeating.longestSubstringWithoutRepeating("abcde") == 5;
        assert LongestSubstringWithoutRepeating.longestSubstringWithoutRepeating("abba") == 2;
        assert LongestSubstringWithoutRepeating.longestSubstringWithoutRepeating("dvdf") == 3;

        System.out.println("All tests passed!");
    }
}
