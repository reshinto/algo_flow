// javac DesignCircularDeque.java DesignCircularDeque_test.java && java -ea DesignCircularDeque_test
import java.util.List;
import java.util.Arrays;

public class DesignCircularDeque_test {
    public static void main(String[] args) {
        assert DesignCircularDeque.designCircularDeque(new String[]{"pushBack 1", "pushBack 2", "pushBack 3"}, 3).equals(Arrays.asList("true", "true", "true"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"pushBack 1", "pushBack 2", "pushBack 3", "pushBack 4"}, 3).equals(Arrays.asList("true", "true", "true", "full"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"popFront"}, 3).equals(Arrays.asList("empty"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"popBack"}, 3).equals(Arrays.asList("empty"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"pushBack 1", "pushBack 2", "pushBack 3", "popFront", "popFront", "popFront"}, 3).equals(Arrays.asList("true", "true", "true", "1", "2", "3"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"pushFront 1", "pushFront 2", "pushFront 3", "popFront", "popFront", "popFront"}, 3).equals(Arrays.asList("true", "true", "true", "3", "2", "1"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"pushBack 10", "pushBack 20", "popBack"}, 3).equals(Arrays.asList("true", "true", "20"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"pushBack 10", "pushBack 20", "peekFront"}, 3).equals(Arrays.asList("true", "true", "10"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"pushBack 10", "pushBack 20", "peekRear"}, 3).equals(Arrays.asList("true", "true", "20"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"peekFront", "peekRear"}, 3).equals(Arrays.asList("empty", "empty"));
        assert DesignCircularDeque.designCircularDeque(new String[]{"pushBack 1", "pushFront 2", "peekFront", "peekRear"}, 3).equals(Arrays.asList("true", "true", "2", "1"));

        System.out.println("All tests passed!");
    }
}
