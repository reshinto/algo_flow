// javac HouseRobberMemoization.java HouseRobberMemoization_test.java && java -ea HouseRobberMemoization_test
public class HouseRobberMemoization_test {
    public static void main(String[] args) {
        assert HouseRobberMemoization.houseRobberMemoization(new int[]{}) == 0 : "empty array should return 0";
        assert HouseRobberMemoization.houseRobberMemoization(new int[]{5}) == 5 : "[5] should return 5";
        assert HouseRobberMemoization.houseRobberMemoization(new int[]{3, 10}) == 10 : "[3,10] should return 10";
        assert HouseRobberMemoization.houseRobberMemoization(new int[]{2, 7, 9, 3, 1}) == 12 : "[2,7,9,3,1] should return 12";
        assert HouseRobberMemoization.houseRobberMemoization(new int[]{4, 4, 4, 4}) == 8 : "[4,4,4,4] should return 8";
        assert HouseRobberMemoization.houseRobberMemoization(new int[]{1, 2, 3, 1}) == 4 : "[1,2,3,1] should return 4";
        assert HouseRobberMemoization.houseRobberMemoization(new int[]{2, 1, 1, 2}) == 4 : "[2,1,1,2] should return 4";
        assert HouseRobberMemoization.houseRobberMemoization(new int[]{5, 3, 4, 11, 2}) == 16 : "[5,3,4,11,2] should return 16";

        System.out.println("All tests passed!");
    }
}
