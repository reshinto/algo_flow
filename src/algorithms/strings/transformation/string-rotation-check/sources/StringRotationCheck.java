// String Rotation Check — checks if pattern is a rotation of text.
// Concatenates text with itself and searches for pattern as a substring.
// Time: O(n)  Space: O(n) for the concatenated string

public class StringRotationCheck {

    public static boolean stringRotationCheck(String text, String pattern) {
        if (pattern.length() != text.length()) return false; // @step:initialize

        String concatenated = text + text; // @step:write-char

        return concatenated.contains(pattern); // @step:visit
    }
}
