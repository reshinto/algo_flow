package main

import (
	"reflect"
	"testing"
)

func TestDesignCircularQueueFillsCapacity(t *testing.T) {
	result := designCircularQueue([]string{"enqueue 1", "enqueue 2", "enqueue 3"}, 3)
	if !reflect.DeepEqual(result, []string{"true", "true", "true"}) {
		t.Errorf("expected [true true true]")
	}
}

func TestDesignCircularQueueOverCapacity(t *testing.T) {
	result := designCircularQueue([]string{"enqueue 1", "enqueue 2", "enqueue 3", "enqueue 4"}, 3)
	if !reflect.DeepEqual(result, []string{"true", "true", "true", "full"}) {
		t.Errorf("expected [true true true full]")
	}
}

func TestDesignCircularQueueDequeueEmpty(t *testing.T) {
	if !reflect.DeepEqual(designCircularQueue([]string{"dequeue"}, 3), []string{"empty"}) {
		t.Errorf("expected [empty]")
	}
}

func TestDesignCircularQueueFifoOrder(t *testing.T) {
	ops := []string{"enqueue 1", "enqueue 2", "enqueue 3", "dequeue", "dequeue", "dequeue"}
	expected := []string{"true", "true", "true", "1", "2", "3"}
	if !reflect.DeepEqual(designCircularQueue(ops, 3), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestDesignCircularQueuePeekFront(t *testing.T) {
	result := designCircularQueue([]string{"enqueue 10", "enqueue 20", "front"}, 3)
	if !reflect.DeepEqual(result, []string{"true", "true", "10"}) {
		t.Errorf("expected [true true 10]")
	}
}

func TestDesignCircularQueuePeekRear(t *testing.T) {
	result := designCircularQueue([]string{"enqueue 10", "enqueue 20", "rear"}, 3)
	if !reflect.DeepEqual(result, []string{"true", "true", "20"}) {
		t.Errorf("expected [true true 20]")
	}
}

func TestDesignCircularQueuePeekEmpty(t *testing.T) {
	if !reflect.DeepEqual(designCircularQueue([]string{"front", "rear"}, 3), []string{"empty", "empty"}) {
		t.Errorf("expected [empty empty]")
	}
}
