// javac NumberOfRecentCalls.java NumberOfRecentCalls_test.java && java -ea NumberOfRecentCalls_test
import java.util.List;
import java.util.Arrays;

public class NumberOfRecentCalls_test {
    public static void main(String[] args) {
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{1, 100, 3001, 3002}).equals(Arrays.asList(1, 2, 3, 3));
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{500}).equals(Arrays.asList(1));
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{1, 500, 1000, 2000, 3000}).equals(Arrays.asList(1, 2, 3, 4, 5));
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{1, 100, 3001, 3002, 6002}).equals(Arrays.asList(1, 2, 3, 3, 2));
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{1, 3001}).equals(Arrays.asList(1, 2));
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{1, 3002}).equals(Arrays.asList(1, 1));
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{1, 3002, 6003, 9004}).equals(Arrays.asList(1, 1, 1, 1));
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{}).equals(List.of());
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{100, 200, 300, 400, 500}).equals(Arrays.asList(1, 2, 3, 4, 5));
        assert NumberOfRecentCalls.numberOfRecentCalls(new int[]{1000, 2000, 4001, 5001, 7002}).equals(Arrays.asList(1, 2, 2, 2, 2));

        System.out.println("All tests passed!");
    }
}
