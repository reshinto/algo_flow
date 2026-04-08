// javac RodCutting.java RodCutting_test.java && java -ea RodCutting_test
public class RodCutting_test {
    public static void main(String[] args) {
        assert RodCutting.rodCutting(new int[]{1, 5, 8, 9, 10, 17, 17, 20}) == 22 : "default input should return 22";
        assert RodCutting.rodCutting(new int[]{1, 5}) == 5 : "[1,5] should return 5";
        assert RodCutting.rodCutting(new int[]{3, 5, 8}) == 9 : "[3,5,8] should return 9";
        assert RodCutting.rodCutting(new int[]{1}) == 1 : "[1] should return 1";
        assert RodCutting.rodCutting(new int[]{}) == 0 : "empty should return 0";
        assert RodCutting.rodCutting(new int[]{10}) == 10 : "[10] should return 10";
        assert RodCutting.rodCutting(new int[]{3, 1, 1}) == 9 : "[3,1,1] should return 9";
        assert RodCutting.rodCutting(new int[]{1, 2, 10}) == 10 : "[1,2,10] should return 10";
        assert RodCutting.rodCutting(new int[]{2, 2, 2}) == 6 : "[2,2,2] should return 6";

        System.out.println("All tests passed!");
    }
}
