public class SortCharactersByFrequency_test {
    public static void main(String[] args) {
        String result1 = SortCharactersByFrequency.sortCharactersByFrequency("tree");
        assert result1.substring(0, 2).equals("ee") : "first 2 chars should be 'ee'";
        assert result1.length() == 4;
        assert result1.contains("t");
        assert result1.contains("r");

        String result2 = SortCharactersByFrequency.sortCharactersByFrequency("z");
        assert result2.equals("z");

        String result3 = SortCharactersByFrequency.sortCharactersByFrequency("cccaab");
        assert result3.substring(0, 3).equals("ccc");
        assert result3.length() == 6;

        String result4 = SortCharactersByFrequency.sortCharactersByFrequency("aaaa");
        assert result4.equals("aaaa");

        String mississippi = "mississippi";
        String result5 = SortCharactersByFrequency.sortCharactersByFrequency(mississippi);
        assert result5.length() == mississippi.length();

        System.out.println("All tests passed!");
    }
}
