/** Step generator for Asteroid Collision — produces ExecutionStep[] using NumericStackTracker. */

import type { ExecutionStep } from "@/types";
import { NumericStackTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const AC_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ASTEROID_COLLISION!);

export interface AsteroidCollisionInput {
  asteroids: number[];
}

export function generateAsteroidCollisionSteps(input: AsteroidCollisionInput): ExecutionStep[] {
  const { asteroids } = input;
  const tracker = new NumericStackTracker(asteroids, AC_LINE_MAP);

  // Logical stack mirrors the tracker stack for collision decisions
  const logicalStack: number[] = [];

  tracker.initialize({ asteroids, stackSize: 0 });

  for (let asteroidIdx = 0; asteroidIdx < asteroids.length; asteroidIdx++) {
    const currentAsteroid = asteroids[asteroidIdx]!;

    tracker.processElement(asteroidIdx, { asteroidIdx, currentAsteroid });

    let alive = true;

    // Process collisions while current moves left and stack top moves right
    while (alive && currentAsteroid < 0 && logicalStack.length > 0) {
      const stackTop = logicalStack[logicalStack.length - 1]!;

      if (stackTop <= 0) {
        // No collision — both moving in the same direction
        break;
      }

      tracker.compare(
        { asteroidIdx, currentAsteroid, stackTop },
        `Compare: stack top ${stackTop} vs incoming ${currentAsteroid}`,
      );

      if (stackTop < -currentAsteroid) {
        // Stack top is smaller — destroy it and keep checking
        logicalStack.pop();
        tracker.maintainMonotonic(
          { asteroidIdx, currentAsteroid, destroyedStackTop: stackTop },
          `Stack top ${stackTop} is smaller than |${currentAsteroid}| — stack top explodes`,
        );
      } else if (stackTop === -currentAsteroid) {
        // Equal size — both explode
        logicalStack.pop();
        tracker.popAndResolve(
          null,
          { asteroidIdx, currentAsteroid, stackTop },
          `Both ${stackTop} and ${currentAsteroid} are equal size — both explode`,
        );
        alive = false;
      } else {
        // Stack top is larger — current asteroid is destroyed
        alive = false;
        tracker.compare(
          { asteroidIdx, currentAsteroid, stackTop, outcome: "destroyed" },
          `Stack top ${stackTop} is larger than |${currentAsteroid}| — incoming asteroid explodes`,
        );
      }
    }

    if (alive) {
      logicalStack.push(currentAsteroid);
      tracker.pushIndex(
        asteroidIdx,
        { asteroidIdx, currentAsteroid, stackSize: logicalStack.length },
        `Asteroid ${currentAsteroid} survives — push onto stack`,
      );
    }
  }

  tracker.complete(
    { survivingAsteroids: [...logicalStack], count: logicalStack.length },
    `Simulation complete — ${logicalStack.length} asteroid(s) survive: [${logicalStack.join(", ")}]`,
  );

  return tracker.getSteps();
}
