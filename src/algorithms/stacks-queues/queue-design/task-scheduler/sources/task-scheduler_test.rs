include!("task-scheduler.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn canonical_example_cooldown_two() {
        assert_eq!(task_scheduler_queue(&["A", "A", "A", "B", "B", "B"], 2), 8);
    }

    #[test]
    fn dense_tasks_no_idle() {
        assert_eq!(task_scheduler_queue(&["A", "A", "B", "B", "C", "C"], 1), 6);
    }

    #[test]
    fn zero_cooldown() {
        assert_eq!(task_scheduler_queue(&["A", "A", "A", "B", "B", "B"], 0), 6);
    }

    #[test]
    fn single_type_high_cooldown() {
        assert_eq!(task_scheduler_queue(&["A", "A", "A"], 100), 203);
    }

    #[test]
    fn single_task() {
        assert_eq!(task_scheduler_queue(&["A"], 5), 1);
    }

    #[test]
    fn two_types_equal_frequency() {
        assert_eq!(task_scheduler_queue(&["A", "A", "B", "B"], 2), 5);
    }

    #[test]
    fn all_identical_zero_cooldown() {
        assert_eq!(task_scheduler_queue(&["A", "A", "A", "A"], 0), 4);
    }

    #[test]
    fn all_distinct_fills_slots() {
        let distinct: Vec<&str> = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(|s| !s.is_empty()).collect();
        assert_eq!(task_scheduler_queue(&distinct, 25), 26);
    }

    #[test]
    fn result_at_least_task_count() {
        let result = task_scheduler_queue(&["A", "B", "C", "D", "E", "F"], 3);
        assert!(result >= 6);
    }
}
