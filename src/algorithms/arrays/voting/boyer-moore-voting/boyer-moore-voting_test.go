package boyermorevoting

import "testing"

func TestBasicMajority(t *testing.T) {
	majorityElement, _ := boyerMooreVoting([]int{2, 2, 1, 1, 1, 2, 2})
	if majorityElement != 2 {
		t.Errorf("Expected majorityElement=2, got %d", majorityElement)
	}
}

func TestAllSame(t *testing.T) {
	majorityElement, _ := boyerMooreVoting([]int{5, 5, 5})
	if majorityElement != 5 {
		t.Errorf("Expected majorityElement=5, got %d", majorityElement)
	}
}

func TestSingleElement(t *testing.T) {
	majorityElement, _ := boyerMooreVoting([]int{42})
	if majorityElement != 42 {
		t.Errorf("Expected majorityElement=42, got %d", majorityElement)
	}
}

func TestEmptyArray(t *testing.T) {
	majorityElement, count := boyerMooreVoting([]int{})
	if majorityElement != -1 {
		t.Errorf("Expected majorityElement=-1, got %d", majorityElement)
	}
	if count != 0 {
		t.Errorf("Expected count=0, got %d", count)
	}
}

func TestMajorityAtStart(t *testing.T) {
	majorityElement, _ := boyerMooreVoting([]int{3, 3, 3, 1, 2})
	if majorityElement != 3 {
		t.Errorf("Expected majorityElement=3, got %d", majorityElement)
	}
}

func TestMajorityAtEnd(t *testing.T) {
	majorityElement, _ := boyerMooreVoting([]int{1, 2, 7, 7, 7})
	if majorityElement != 7 {
		t.Errorf("Expected majorityElement=7, got %d", majorityElement)
	}
}

func TestAlternatingWithMajority(t *testing.T) {
	majorityElement, _ := boyerMooreVoting([]int{1, 9, 1, 9, 1, 9, 1})
	if majorityElement != 1 {
		t.Errorf("Expected majorityElement=1, got %d", majorityElement)
	}
}

func TestTwoEqualElements(t *testing.T) {
	majorityElement, _ := boyerMooreVoting([]int{4, 4})
	if majorityElement != 4 {
		t.Errorf("Expected majorityElement=4, got %d", majorityElement)
	}
}

func TestLargeMajority(t *testing.T) {
	majorityElement, _ := boyerMooreVoting([]int{6, 6, 6, 1, 6, 2, 6, 3, 6})
	if majorityElement != 6 {
		t.Errorf("Expected majorityElement=6, got %d", majorityElement)
	}
}

func TestNegativeNumbers(t *testing.T) {
	majorityElement, _ := boyerMooreVoting([]int{-3, -3, 1, -3, 2})
	if majorityElement != -3 {
		t.Errorf("Expected majorityElement=-3, got %d", majorityElement)
	}
}
