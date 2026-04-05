// Reverse String — two-pointer in-place swap on a character array.
// Returns the reversed version of the input string.
// Time: O(n)  Space: O(1) auxiliary (O(n) for the output string)

public class ReverseString {

    public static String reverseString(String text) {
        char[] chars = text.toCharArray(); // @step:initialize

        int leftIndex = 0; // @step:initialize
        int rightIndex = chars.length - 1; // @step:initialize

        while (leftIndex < rightIndex) {
            char leftChar = chars[leftIndex]; // @step:read-char
            char rightChar = chars[rightIndex]; // @step:read-char

            chars[leftIndex] = rightChar; // @step:swap-pointers
            chars[rightIndex] = leftChar; // @step:swap-pointers

            leftIndex++; // @step:visit
            rightIndex--; // @step:visit
        }

        return new String(chars); // @step:complete
    }
}
