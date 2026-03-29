// Count Bits tabulation — dp[i] = number of 1-bits in binary representation of i
public class CountBits {
    public static int[] countBits(int targetNumber) { // @step:initialize
        int[] dpTable = new int[targetNumber + 1]; // @step:initialize,fill-table
        // dp[0] = 0: zero has no set bits
        for (int bitIndex = 1; bitIndex <= targetNumber; bitIndex++) { // @step:compute-cell
            // Half the number shares all bits except possibly the LSB
            dpTable[bitIndex] = dpTable[bitIndex >> 1] + (bitIndex & 1); // @step:compute-cell,read-cache
        }
        return dpTable; // @step:complete
    }
}
