// Daily Temperatures — monotonic stack: for each day, find how many days until a warmer temperature (0 if none)
package dailytemperatures

func dailyTemperatures(temperatures []int) []int {
	arrayLength := len(temperatures)
	waitDays := make([]int, arrayLength)  // @step:initialize
	pendingStack := []int{}               // @step:initialize

	for dayIndex := 0; dayIndex < arrayLength; dayIndex++ {
		todayTemp := temperatures[dayIndex] // @step:visit

		for len(pendingStack) > 0 {
			stackTop := pendingStack[len(pendingStack)-1] // @step:compare
			if temperatures[stackTop] < todayTemp {       // @step:compare
				pendingStack = pendingStack[:len(pendingStack)-1] // @step:compare
				waitDays[stackTop] = dayIndex - stackTop          // @step:compare
			} else {
				break
			}
		}

		pendingStack = append(pendingStack, dayIndex) // @step:visit
	}

	return waitDays // @step:complete
}
