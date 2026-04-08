// javac HouseRobberTabulation.java HouseRobberTabulation_test.java && java -ea HouseRobberTabulation_test
public class HouseRobberTabulation_test {
    public static void main(String[] args) {
        assert HouseRobberTabulation.houseRobberTabulation(new int[]{}) == 0 : "empty array should return 0";
        assert HouseRobberTabulation.houseRobberTabulation(new int[]{5}) == 5 : "[5] should return 5";
        assert HouseRobberTabulation.houseRobberTabulation(new int[]{2, 7}) == 7 : "[2,7] should return 7";
        assert HouseRobberTabulation.houseRobberTabulation(new int[]{2, 7, 9, 3, 1}) == 12 : "[2,7,9,3,1] should return 12";
        assert HouseRobberTabulation.houseRobberTabulation(new int[]{1, 2, 3, 1}) == 4 : "[1,2,3,1] should return 4";

        System.out.println("All tests passed!");
    }
}
