package besttimebuysell

import "testing"

func TestClassicExample(t *testing.T) {
	profit, buyDay, sellDay := bestTimeBuySell([]int{7, 1, 5, 3, 6, 4})
	if profit != 5 || buyDay != 1 || sellDay != 4 {
		t.Errorf("Expected profit=5 buyDay=1 sellDay=4, got %d %d %d", profit, buyDay, sellDay)
	}
}

func TestAlwaysDecreasing(t *testing.T) {
	profit, _, _ := bestTimeBuySell([]int{7, 6, 4, 3, 1})
	if profit != 0 {
		t.Errorf("Expected profit=0, got %d", profit)
	}
}

func TestStrictlyIncreasing(t *testing.T) {
	profit, buyDay, sellDay := bestTimeBuySell([]int{1, 2, 3, 4, 5})
	if profit != 4 || buyDay != 0 || sellDay != 4 {
		t.Errorf("Expected profit=4 buyDay=0 sellDay=4, got %d %d %d", profit, buyDay, sellDay)
	}
}

func TestSingleElement(t *testing.T) {
	profit, _, _ := bestTimeBuySell([]int{42})
	if profit != 0 {
		t.Errorf("Expected profit=0, got %d", profit)
	}
}

func TestEmptyArray(t *testing.T) {
	profit, buyDay, sellDay := bestTimeBuySell([]int{})
	if profit != 0 || buyDay != -1 || sellDay != -1 {
		t.Errorf("Expected profit=0 buyDay=-1 sellDay=-1, got %d %d %d", profit, buyDay, sellDay)
	}
}

func TestPriceSpikeMiddle(t *testing.T) {
	profit, buyDay, sellDay := bestTimeBuySell([]int{1, 100, 2, 3})
	if profit != 99 || buyDay != 0 || sellDay != 1 {
		t.Errorf("Expected profit=99 buyDay=0 sellDay=1, got %d %d %d", profit, buyDay, sellDay)
	}
}

func TestBestAtEnd(t *testing.T) {
	profit, buyDay, sellDay := bestTimeBuySell([]int{9, 8, 7, 1, 10})
	if profit != 9 || buyDay != 3 || sellDay != 4 {
		t.Errorf("Expected profit=9 buyDay=3 sellDay=4, got %d %d %d", profit, buyDay, sellDay)
	}
}

func TestMultipleMinimums(t *testing.T) {
	profit, buyDay, sellDay := bestTimeBuySell([]int{5, 3, 1, 2, 8})
	if profit != 7 || buyDay != 2 || sellDay != 4 {
		t.Errorf("Expected profit=7 buyDay=2 sellDay=4, got %d %d %d", profit, buyDay, sellDay)
	}
}
