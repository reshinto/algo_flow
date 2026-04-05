// Run-Length Decoding — expands a compressed string like "3a2b4c" into "aaabbcccc".
// Parses leading digit sequences as repeat counts, then repeats the following character.
// Time: O(output length)  Space: O(output length)

public class RunLengthDecoding {

    public static String runLengthDecoding(String text) {
        StringBuilder output = new StringBuilder(); // @step:initialize

        int readIndex = 0; // @step:initialize

        while (readIndex < text.length()) {
            StringBuilder digitString = new StringBuilder(); // @step:read-char

            while (readIndex < text.length() && Character.isDigit(text.charAt(readIndex))) {
                digitString.append(text.charAt(readIndex)); // @step:read-char
                readIndex++;
            }

            int repeatCount = Integer.parseInt(digitString.toString()); // @step:visit

            char letter = readIndex < text.length() ? text.charAt(readIndex) : 0; // @step:read-char

            String repeated = String.valueOf(letter).repeat(repeatCount); // @step:write-char

            for (char character : repeated.toCharArray()) {
                output.append(character); // @step:write-char
            }

            readIndex++; // @step:visit
        }

        return output.toString(); // @step:complete
    }
}
