package besttimebuysellunlimited

import "testing"

func TestDefaultInput(t *testing.T) {
	profit, _ := bestTimeBuySellUnlimited([]int{7, 1, 5, 3, 6, 4})
	if profit != 7 {
		t.Errorf("Expected 7, got %d", profit)
	}
}

func TestEmptyPrices(t *testing.T) {
	profit, txns := bestTimeBuySellUnlimited([]int{})
	if profit != 0 {
		t.Errorf("Expected 0, got %d", profit)
	}
	if len(txns) != 0 {
		t.Errorf("Expected no transactions, got %d", len(txns))
	}
}

func TestSinglePrice(t *testing.T) {
	profit, _ := bestTimeBuySellUnlimited([]int{5})
	if profit != 0 {
		t.Errorf("Expected 0, got %d", profit)
	}
}

func TestAlwaysFalling(t *testing.T) {
	profit, txns := bestTimeBuySellUnlimited([]int{5, 4, 3, 2, 1})
	if profit != 0 {
		t.Errorf("Expected 0, got %d", profit)
	}
	if len(txns) != 0 {
		t.Errorf("Expected no transactions, got %d", len(txns))
	}
}

func TestStrictlyIncreasing(t *testing.T) {
	profit, _ := bestTimeBuySellUnlimited([]int{1, 2, 3, 4, 5})
	if profit != 4 {
		t.Errorf("Expected 4, got %d", profit)
	}
}

func TestAlternating(t *testing.T) {
	profit, _ := bestTimeBuySellUnlimited([]int{1, 5, 1, 5, 1, 5})
	if profit != 12 {
		t.Errorf("Expected 12, got %d", profit)
	}
}

func TestAllEqual(t *testing.T) {
	profit, _ := bestTimeBuySellUnlimited([]int{3, 3, 3, 3})
	if profit != 0 {
		t.Errorf("Expected 0, got %d", profit)
	}
}

func TestTwoPricesGain(t *testing.T) {
	profit, txns := bestTimeBuySellUnlimited([]int{1, 7})
	if profit != 6 {
		t.Errorf("Expected 6, got %d", profit)
	}
	if len(txns) != 1 {
		t.Errorf("Expected 1 transaction, got %d", len(txns))
	}
}

func TestTransactionDays(t *testing.T) {
	profit, txns := bestTimeBuySellUnlimited([]int{1, 5, 3, 7})
	if profit != 8 {
		t.Errorf("Expected 8, got %d", profit)
	}
	if len(txns) != 2 {
		t.Errorf("Expected 2 transactions, got %d", len(txns))
	}
	if txns[0] != [2]int{0, 1} {
		t.Errorf("Expected txn[0]=[0,1], got %v", txns[0])
	}
	if txns[1] != [2]int{2, 3} {
		t.Errorf("Expected txn[1]=[2,3], got %v", txns[1])
	}
}
