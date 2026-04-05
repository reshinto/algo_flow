// String Compression (Run-Length Encoding) — count consecutive repeated characters.
// Returns the compressed form "a2b1c5a3" only if shorter than the original; otherwise returns the original.
// Time: O(n)  Space: O(n) for the output buffer

public class StringCompression {

    public static String stringCompression(String text) {
        if (text.isEmpty()) { // @step:initialize
            return text; // @step:initialize
        }

        StringBuilder compressed = new StringBuilder(); // @step:initialize
        int charIndex = 0; // @step:initialize

        while (charIndex < text.length()) {
            char currentChar = text.charAt(charIndex); // @step:read-char
            int count = 0; // @step:read-char

            while (charIndex < text.length() && text.charAt(charIndex) == currentChar) {
                count++; // @step:count
                charIndex++; // @step:count
            }

            compressed.append(currentChar); // @step:write-char
            compressed.append(count); // @step:write-char
        }

        String result = compressed.toString(); // @step:complete
        return result.length() < text.length() ? result : text; // @step:complete
    }
}
