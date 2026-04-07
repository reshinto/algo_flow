// javac LisTabulation.java LisTabulation_test.java && java -ea LisTabulation_test
public class LisTabulation_test {
    public static void main(String[] args) {
        assert LisTabulation.lisLength(new int[]{10, 9, 2, 5, 3, 7, 101, 18}) == 4 : "[10,9,2,5,3,7,101,18] should return 4";
        assert LisTabulation.lisLength(new int[]{0, 1, 0, 3, 2, 3}) == 4 : "[0,1,0,3,2,3] should return 4";
        assert LisTabulation.lisLength(new int[]{7, 7, 7}) == 1 : "all equal should return 1";
        assert LisTabulation.lisLength(new int[]{1}) == 1 : "single element should return 1";
        assert LisTabulation.lisLength(new int[]{}) == 0 : "empty sequence should return 0";
        assert LisTabulation.lisLength(new int[]{1, 2, 3, 4, 5}) == 5 : "strictly ascending should return 5";
        assert LisTabulation.lisLength(new int[]{5, 4, 3, 2, 1}) == 1 : "strictly descending should return 1";
        assert LisTabulation.lisLength(new int[]{1, 3, 3, 5}) == 3 : "[1,3,3,5] strict increase should return 3";

        System.out.println("All tests passed!");
    }
}
