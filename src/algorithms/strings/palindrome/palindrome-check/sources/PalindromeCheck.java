// Palindrome Check — Two-pointer approach
// Returns true if the string reads the same forwards and backwards.
// Time: O(n), Space: O(1)

public class PalindromeCheck {
    public static boolean palindromeCheck(String text) {
        int leftIndex = 0; // @step:initialize
        int rightIndex = text.length() - 1; // @step:initialize

        while (leftIndex < rightIndex) { // @step:compare
            if (text.charAt(leftIndex) != text.charAt(rightIndex)) { // @step:compare
                return false; // @step:mismatch
            }
            leftIndex++; // @step:match
            rightIndex--; // @step:match
        }

        return true; // @step:complete
    }
}
