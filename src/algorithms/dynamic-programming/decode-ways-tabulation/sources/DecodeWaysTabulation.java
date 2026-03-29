// Decode Ways tabulation — count decoding possibilities for a digit string bottom-up
public class DecodeWaysTabulation {
    public static int decodeWaysTabulation(String digits) { // @step:initialize
        int digitCount = digits.length(); // @step:initialize
        if (digitCount == 0) return 0; // @step:initialize
        int[] dpTable = new int[digitCount + 1]; // @step:initialize
        dpTable[0] = 1; // @step:fill-table
        // A string of one digit can be decoded iff it is not '0'
        dpTable[1] = digits.charAt(0) != '0' ? 1 : 0; // @step:fill-table
        for (int position = 2; position <= digitCount; position++) { // @step:read-cache
            int singleDigit = digits.charAt(position - 1) - '0'; // @step:read-cache
            if (singleDigit >= 1 && singleDigit <= 9) { // @step:read-cache
                dpTable[position] += dpTable[position - 1]; // @step:read-cache
            }
            int twoDigitValue = Integer.parseInt(digits.substring(position - 2, position)); // @step:read-cache
            if (twoDigitValue >= 10 && twoDigitValue <= 26) { // @step:read-cache
                dpTable[position] += dpTable[position - 2]; // @step:read-cache
            }
            // @step:compute-cell
        }
        return dpTable[digitCount]; // @step:complete
    }
}
