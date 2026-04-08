// javac CoinChangeMinTabulation.java CoinChangeMinTabulation_test.java && java -ea CoinChangeMinTabulation_test
public class CoinChangeMinTabulation_test {
    public static void main(String[] args) {
        assert CoinChangeMinTabulation.coinChangeMinTabulation(11, new int[]{1, 5, 10, 25}) == 2 : "default input should return 2";
        assert CoinChangeMinTabulation.coinChangeMinTabulation(3, new int[]{2}) == -1 : "impossible should return -1";
        assert CoinChangeMinTabulation.coinChangeMinTabulation(0, new int[]{1}) == 0 : "amount=0 should return 0";
        assert CoinChangeMinTabulation.coinChangeMinTabulation(6, new int[]{1, 3, 4}) == 2 : "greedy-failing case should return 2";
        assert CoinChangeMinTabulation.coinChangeMinTabulation(25, new int[]{1, 5, 10, 25}) == 1 : "exact coin should return 1";
        assert CoinChangeMinTabulation.coinChangeMinTabulation(7, new int[]{3, 6}) == -1 : "amount=7 coins=[3,6] should return -1";
        assert CoinChangeMinTabulation.coinChangeMinTabulation(10, new int[]{5}) == 2 : "amount=10 coins=[5] should return 2";

        System.out.println("All tests passed!");
    }
}
