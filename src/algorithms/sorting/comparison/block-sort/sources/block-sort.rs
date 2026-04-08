// Block Sort (WikiSort) — in-place stable merge sort using rotation-based merging without extra memory
fn block_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:initialize
    }

    // Reverse elements in sorted_array[start_index..=end_index] in place
    fn reverse_segment(sorted_array: &mut Vec<i64>, start_index: usize, end_index: usize) {
        // @step:rotate
        let mut low = start_index;
        let mut high = end_index;
        while low < high {
            // @step:swap
            sorted_array.swap(low, high); // @step:swap
            low += 1;
            high -= 1;
        }
    }

    // Rotate a subarray [left_start..=right_end] so that [mid_point..=right_end] comes before [left_start..mid_point-1]
    fn rotate_left(sorted_array: &mut Vec<i64>, left_start: usize, mid_point: usize, right_end: usize) {
        // @step:rotate
        reverse_segment(sorted_array, left_start, mid_point - 1);
        reverse_segment(sorted_array, mid_point, right_end);
        reverse_segment(sorted_array, left_start, right_end);
    }

    // In-place stable merge of two adjacent sorted runs
    fn merge_in_place(sorted_array: &mut Vec<i64>, run_start: usize, run_mid: usize, run_end: usize) {
        // @step:merge
        if run_start >= run_mid || run_mid > run_end {
            return; // @step:merge
        }

        let mut left_pointer = run_start;
        let mut right_pointer = run_mid;

        while left_pointer < right_pointer && right_pointer <= run_end {
            // @step:compare
            if sorted_array[left_pointer] <= sorted_array[right_pointer] {
                // @step:compare
                left_pointer += 1; // Left element already in correct position
            } else {
                // Find how far to rotate
                let mut insertion_point = right_pointer;
                while insertion_point <= run_end && sorted_array[insertion_point] < sorted_array[left_pointer] {
                    // @step:compare
                    insertion_point += 1;
                }

                // Rotate the segment to bring right-run elements into position
                let right_segment_length = insertion_point - right_pointer;
                rotate_left(sorted_array, left_pointer, right_pointer, insertion_point - 1); // @step:rotate

                left_pointer += right_segment_length;
                right_pointer = insertion_point;
            }
        }
    }

    // Find natural sorted runs in the array
    let mut runs: Vec<(usize, usize)> = Vec::new(); // [start_index, end_index]
    let mut run_start = 0usize;

    for scan_index in 1..array_length {
        // @step:find-runs
        if sorted_array[scan_index] < sorted_array[scan_index - 1] {
            // @step:compare
            runs.push((run_start, scan_index - 1)); // @step:find-runs
            run_start = scan_index;
        }
    }
    runs.push((run_start, array_length - 1)); // @step:find-runs

    // Merge adjacent runs iteratively (bottom-up merge sort style)
    while runs.len() > 1 {
        // @step:merge
        let mut merged_runs: Vec<(usize, usize)> = Vec::new();

        let mut run_index = 0;
        while run_index < runs.len() {
            if run_index + 1 < runs.len() {
                let left_run = runs[run_index];
                let right_run = runs[run_index + 1];

                merge_in_place(&mut sorted_array, left_run.0, right_run.0, right_run.1); // @step:merge

                merged_runs.push((left_run.0, right_run.1));
            } else {
                merged_runs.push(runs[run_index]);
            }
            run_index += 2;
        }

        runs = merged_runs;
    }

    // Mark all elements as sorted
    for _sorted_index in 0..array_length {
        // @step:mark-sorted
    }

    sorted_array // @step:complete
}
