// javac LisMemoization.java LisMemoization_test.java && java -ea LisMemoization_test
public class LisMemoization_test {
    public static void main(String[] args) {
        assert LisMemoization.lisMemoization(new int[]{}) == 0 : "empty sequence should return 0";
        assert LisMemoization.lisMemoization(new int[]{42}) == 1 : "single element should return 1";
        assert LisMemoization.lisMemoization(new int[]{5, 4, 3, 2, 1}) == 1 : "strictly descending should return 1";
        assert LisMemoization.lisMemoization(new int[]{1, 2, 3, 4, 5}) == 5 : "strictly ascending should return 5";
        assert LisMemoization.lisMemoization(new int[]{10, 9, 2, 5, 3, 7, 101, 18}) == 4 : "[10,9,2,5,3,7,101,18] should return 4";
        assert LisMemoization.lisMemoization(new int[]{3, 10, 2, 1, 20}) == 3 : "[3,10,2,1,20] should return 3";
        assert LisMemoization.lisMemoization(new int[]{3, 2}) == 1 : "[3,2] should return 1";
        assert LisMemoization.lisMemoization(new int[]{50, 3, 10, 7, 40, 80}) == 4 : "[50,3,10,7,40,80] should return 4";
        assert LisMemoization.lisMemoization(new int[]{7, 7, 7, 7}) == 1 : "all equal should return 1";
        assert LisMemoization.lisMemoization(new int[]{1, 3, 6, 7, 9, 4, 10, 5, 6}) == 6 : "[1,3,6,7,9,4,10,5,6] should return 6";

        System.out.println("All tests passed!");
    }
}
