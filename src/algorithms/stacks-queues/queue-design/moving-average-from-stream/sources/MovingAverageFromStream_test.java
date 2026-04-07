// javac MovingAverageFromStream.java MovingAverageFromStream_test.java && java -ea MovingAverageFromStream_test
import java.util.List;

public class MovingAverageFromStream_test {
    static void assertApprox(double actual, double expected, double tolerance) {
        assert Math.abs(actual - expected) < tolerance : "expected ~" + expected + " but got " + actual;
    }

    public static void main(String[] args) {
        List<Double> result = MovingAverageFromStream.movingAverageFromStream(new int[]{1, 10, 3, 5}, 3);
        assertApprox(result.get(0), 1.0, 0.001);
        assertApprox(result.get(1), 5.5, 0.001);
        assertApprox(result.get(2), 4.667, 0.01);
        assertApprox(result.get(3), 6.0, 0.001);

        List<Double> resultK1 = MovingAverageFromStream.movingAverageFromStream(new int[]{4, 7, 2}, 1);
        assertApprox(resultK1.get(0), 4.0, 0.001);
        assertApprox(resultK1.get(1), 7.0, 0.001);
        assertApprox(resultK1.get(2), 2.0, 0.001);

        List<Double> resultK2 = MovingAverageFromStream.movingAverageFromStream(new int[]{10, 20, 30, 40}, 2);
        assertApprox(resultK2.get(0), 10.0, 0.001);
        assertApprox(resultK2.get(1), 15.0, 0.001);
        assertApprox(resultK2.get(2), 25.0, 0.001);
        assertApprox(resultK2.get(3), 35.0, 0.001);

        assert MovingAverageFromStream.movingAverageFromStream(new int[]{42}, 3).get(0).equals(42.0);

        List<Double> identical = MovingAverageFromStream.movingAverageFromStream(new int[]{5, 5, 5, 5}, 3);
        for (double avg : identical) {
            assertApprox(avg, 5.0, 0.001);
        }

        System.out.println("All tests passed!");
    }
}
