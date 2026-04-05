// Valid Palindrome — Two-pointer approach ignoring non-alphanumeric characters
// Returns true if the string is a palindrome when only alphanumeric characters are considered.
// Time: O(n), Space: O(1)

public class ValidPalindrome {
    public static boolean validPalindrome(String text) {
        int leftIndex = 0; // @step:initialize
        int rightIndex = text.length() - 1; // @step:initialize

        while (leftIndex < rightIndex) {
            while (leftIndex < rightIndex && !Character.isLetterOrDigit(text.charAt(leftIndex))) {
                leftIndex++; // @step:skipNonAlphanumeric
            }
            while (leftIndex < rightIndex && !Character.isLetterOrDigit(text.charAt(rightIndex))) {
                rightIndex--; // @step:skipNonAlphanumeric
            }

            if (Character.toLowerCase(text.charAt(leftIndex)) != Character.toLowerCase(text.charAt(rightIndex))) { // @step:compare
                return false; // @step:mismatch
            }
            leftIndex++; // @step:match
            rightIndex--; // @step:match
        }

        return true; // @step:complete
    }
}
