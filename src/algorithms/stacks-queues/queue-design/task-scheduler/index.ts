import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { taskSchedulerQueue } from "./sources/task-scheduler.ts?fn";
import { generateTaskSchedulerSteps } from "./step-generator";
import type { TaskSchedulerInput } from "./step-generator";
import { taskSchedulerEducational } from "./educational";

import typescriptSource from "./sources/task-scheduler.ts?raw";
import pythonSource from "./sources/task-scheduler.py?raw";
import javaSource from "./sources/TaskScheduler.java?raw";
import rustSource from "./sources/task-scheduler.rs?raw";
import cppSource from "./sources/TaskScheduler.cpp?raw";
import goSource from "./sources/task-scheduler.go?raw";

function executeTaskScheduler(input: TaskSchedulerInput): number {
  return taskSchedulerQueue(input.tasks, input.cooldown) as number;
}

const taskSchedulerDefinition: AlgorithmDefinition<TaskSchedulerInput> = {
  meta: {
    id: ALGORITHM_ID.TASK_SCHEDULER!,
    name: "Task Scheduler",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-design",
    description:
      "Compute the minimum CPU intervals to execute all tasks with a cooldown period — uses a queue as a waiting area and a greedy frequency formula for O(n) time and O(1) space",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { tasks: ["A", "A", "A", "B", "B", "B"], cooldown: 2 },
  },
  execute: executeTaskScheduler,
  generateSteps: generateTaskSchedulerSteps,
  educational: taskSchedulerEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(taskSchedulerDefinition);
