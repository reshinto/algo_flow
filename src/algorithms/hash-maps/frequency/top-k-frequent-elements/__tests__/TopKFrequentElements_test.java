import java.util.Arrays;

public class TopKFrequentElements_test {
    private static boolean contains(int[] arr, int val) {
        for (int item : arr) {
            if (item == val) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        int[] result1 = TopKFrequentElements.topKFrequentElements(new int[]{1, 1, 1, 2, 2, 3}, 2);
        assert result1.length == 2;
        assert contains(result1, 1);
        assert contains(result1, 2);

        int[] result2 = TopKFrequentElements.topKFrequentElements(new int[]{1, 1, 2, 2, 2, 3}, 1);
        assert result2.length == 1;
        assert result2[0] == 2;

        int[] result3 = TopKFrequentElements.topKFrequentElements(new int[]{1, 2, 3}, 3);
        assert result3.length == 3;

        int[] result4 = TopKFrequentElements.topKFrequentElements(new int[]{7, 7, 7, 7}, 1);
        assert result4.length == 1 && result4[0] == 7;

        int[] result5 = TopKFrequentElements.topKFrequentElements(new int[]{4, 4, 4, 4, 5, 5, 6}, 2);
        assert result5.length == 2;
        assert contains(result5, 4);
        assert contains(result5, 5);

        int[] result6 = TopKFrequentElements.topKFrequentElements(new int[]{-1, -1, -2, -2, -2, 3}, 2);
        assert result6.length == 2;
        assert contains(result6, -2);
        assert contains(result6, -1);

        System.out.println("All tests passed!");
    }
}
