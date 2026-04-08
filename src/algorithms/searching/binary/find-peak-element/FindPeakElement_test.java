public class FindPeakElement_test {
    public static void main(String[] args) {
        assert FindPeakElement.findPeakElement(new int[]{1, 3, 20, 4, 1, 0}) == 2 : "should find peak in default example";
        assert FindPeakElement.findPeakElement(new int[]{5, 4, 3, 2, 1}) == 0 : "should find peak at first element when strictly decreasing";
        assert FindPeakElement.findPeakElement(new int[]{1, 2, 3, 4, 5}) == 4 : "should find peak at last element when strictly increasing";
        assert FindPeakElement.findPeakElement(new int[]{42}) == 0 : "should handle single element";
        assert FindPeakElement.findPeakElement(new int[]{10, 5}) == 0 : "should find peak in two-element array with larger first";
        assert FindPeakElement.findPeakElement(new int[]{5, 10}) == 1 : "should find peak in two-element array with larger second";
        assert FindPeakElement.findPeakElement(new int[]{1, 2, 3, 5, 3, 2, 1}) == 3 : "should find peak in mountain-shaped array";
        assert FindPeakElement.findPeakElement(new int[]{3, 2, 1}) == 0 : "should find peak for descent from start";

        // Verify a valid peak is returned for multiple-peak array
        int[] multiplePeakArray = {1, 5, 2, 7, 3};
        int peakIndex = FindPeakElement.findPeakElement(multiplePeakArray);
        int peakValue = multiplePeakArray[peakIndex];
        int leftNeighbor = peakIndex > 0 ? multiplePeakArray[peakIndex - 1] : Integer.MIN_VALUE;
        int rightNeighbor = peakIndex < multiplePeakArray.length - 1 ? multiplePeakArray[peakIndex + 1] : Integer.MIN_VALUE;
        assert peakValue > leftNeighbor : "peak should be greater than left neighbor";
        assert peakValue > rightNeighbor : "peak should be greater than right neighbor";

        System.out.println("All tests passed!");
    }
}
