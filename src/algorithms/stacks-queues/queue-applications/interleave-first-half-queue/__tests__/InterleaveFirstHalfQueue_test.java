// javac InterleaveFirstHalfQueue.java InterleaveFirstHalfQueue_test.java && java -ea InterleaveFirstHalfQueue_test
import java.util.List;
import java.util.Arrays;

public class InterleaveFirstHalfQueue_test {
    public static void main(String[] args) {
        assert InterleaveFirstHalfQueue.interleaveFirstHalfQueue(new int[]{1, 2, 3, 4, 5, 6}).equals(Arrays.asList(1, 4, 2, 5, 3, 6));
        assert InterleaveFirstHalfQueue.interleaveFirstHalfQueue(new int[]{1, 2, 3, 4}).equals(Arrays.asList(1, 3, 2, 4));
        assert InterleaveFirstHalfQueue.interleaveFirstHalfQueue(new int[]{1, 2}).equals(Arrays.asList(1, 2));
        assert InterleaveFirstHalfQueue.interleaveFirstHalfQueue(new int[]{42}).equals(Arrays.asList(42));
        assert InterleaveFirstHalfQueue.interleaveFirstHalfQueue(new int[]{}).equals(List.of());
        assert InterleaveFirstHalfQueue.interleaveFirstHalfQueue(new int[]{1, 2, 3, 4, 5, 6, 7, 8}).equals(Arrays.asList(1, 5, 2, 6, 3, 7, 4, 8));

        List<Integer> result = InterleaveFirstHalfQueue.interleaveFirstHalfQueue(new int[]{10, 20, 30, 40});
        assert result.size() == 4;

        System.out.println("All tests passed!");
    }
}
