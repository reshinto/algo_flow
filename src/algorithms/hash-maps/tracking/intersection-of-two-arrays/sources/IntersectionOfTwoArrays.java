// Intersection of Two Arrays — find common elements using a hash set
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class IntersectionOfTwoArrays {
    public static List<Integer> intersectionOfTwoArrays(int[] numbersA, int[] numbersB) {
        HashSet<Integer> setA = new HashSet<>(); // @step:initialize
        for (int elementIndex = 0; elementIndex < numbersA.length; elementIndex++) {
            setA.add(numbersA[elementIndex]); // @step:insert-key
        }
        List<Integer> result = new ArrayList<>();
        for (int elementIndex = 0; elementIndex < numbersB.length; elementIndex++) {
            int currentNum = numbersB[elementIndex];
            if (setA.contains(currentNum)) { // @step:lookup-key
                result.add(currentNum); // @step:key-found
                setA.remove(currentNum);
            }
        }
        return result; // @step:complete
    }
}
