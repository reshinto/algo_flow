import java.util.Collections;
import java.util.List;

public class FindAllDuplicates_test {
    public static void main(String[] args) {
        // Default input [4,3,2,7,8,2,3,1] -> [2,3]
        List<Integer> result1 = FindAllDuplicates.findAllDuplicates(new int[]{4, 3, 2, 7, 8, 2, 3, 1});
        Collections.sort(result1);
        assert result1.equals(java.util.Arrays.asList(2, 3)) : "Expected [2,3], got " + result1;

        // No duplicates [1,2,3,4,5] -> []
        List<Integer> result2 = FindAllDuplicates.findAllDuplicates(new int[]{1, 2, 3, 4, 5});
        assert result2.isEmpty() : "Expected [], got " + result2;

        // Single duplicate [1,2,3,2] -> [2]
        List<Integer> result3 = FindAllDuplicates.findAllDuplicates(new int[]{1, 2, 3, 2});
        assert result3.equals(java.util.Arrays.asList(2)) : "Expected [2], got " + result3;

        // Multiple duplicates [1,1,2,2,3,3] -> [1,2,3]
        List<Integer> result4 = FindAllDuplicates.findAllDuplicates(new int[]{1, 1, 2, 2, 3, 3});
        Collections.sort(result4);
        assert result4.equals(java.util.Arrays.asList(1, 2, 3)) : "Expected [1,2,3], got " + result4;

        // Empty array -> []
        List<Integer> result5 = FindAllDuplicates.findAllDuplicates(new int[]{});
        assert result5.isEmpty() : "Expected [], got " + result5;

        System.out.println("All tests passed!");
    }
}
