import java.util.Arrays;

public class PreviousSmallerElement_test {
    public static void main(String[] args) {
        // Default input [4,10,5,8,20,15,3,12]
        {
            int[] result = PreviousSmallerElement.previousSmallerElement(new int[]{4, 10, 5, 8, 20, 15, 3, 12});
            assert Arrays.equals(result, new int[]{-1, 4, 4, 5, 8, 8, -1, 3}) : "Default input failed";
        }

        // Strictly decreasing -> all -1
        {
            int[] result = PreviousSmallerElement.previousSmallerElement(new int[]{5, 4, 3, 2, 1});
            assert Arrays.equals(result, new int[]{-1, -1, -1, -1, -1}) : "Decreasing failed";
        }

        // Strictly increasing -> previous element each time
        {
            int[] result = PreviousSmallerElement.previousSmallerElement(new int[]{1, 2, 3, 4, 5});
            assert Arrays.equals(result, new int[]{-1, 1, 2, 3, 4}) : "Increasing failed";
        }

        // All equal -> all -1 (not strictly smaller)
        {
            int[] result = PreviousSmallerElement.previousSmallerElement(new int[]{3, 3, 3, 3});
            assert Arrays.equals(result, new int[]{-1, -1, -1, -1}) : "All equal failed";
        }

        // Single element
        {
            int[] result = PreviousSmallerElement.previousSmallerElement(new int[]{7});
            assert Arrays.equals(result, new int[]{-1}) : "Single element failed";
        }

        // Empty array
        {
            int[] result = PreviousSmallerElement.previousSmallerElement(new int[]{});
            assert result.length == 0 : "Empty array failed";
        }

        // Valley-peak [1,3,2,4]
        {
            int[] result = PreviousSmallerElement.previousSmallerElement(new int[]{1, 3, 2, 4});
            assert Arrays.equals(result, new int[]{-1, 1, 1, 2}) : "Valley-peak failed";
        }

        System.out.println("All tests passed!");
    }
}
