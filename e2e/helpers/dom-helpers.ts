import type { Page } from "@playwright/test";

export interface StepInfo {
  current: number;
  total: number;
}

export function getStepCounter(page: Page) {
  return page
    .locator("span")
    .filter({ hasText: /^\d+ \/ \d+$/ })
    .first();
}

export async function getStepIndex(page: Page): Promise<StepInfo | null> {
  const text = await getStepCounter(page).textContent();
  const match = text?.match(/^(\d+) \/ (\d+)$/);
  return match ? { current: Number(match[1]), total: Number(match[2]) } : null;
}

export async function waitForStepChange(page: Page, previousCurrent: number): Promise<void> {
  await page.waitForFunction(
    (prev) => {
      const spans = [...document.querySelectorAll("span")];
      const counter = spans.find((spanEl) => /^\d+ \/ \d+$/.test(spanEl.textContent ?? ""));
      if (!counter) return false;
      const matchResult = counter.textContent?.match(/^(\d+) \/ (\d+)$/);
      return matchResult !== null && matchResult !== undefined && Number(matchResult[1]) !== prev;
    },
    previousCurrent,
    { timeout: 3000 },
  );
}

export async function waitForStepReset(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const spans = [...document.querySelectorAll("span")];
      const counter = spans.find((spanEl) => /^\d+ \/ \d+$/.test(spanEl.textContent ?? ""));
      if (!counter) return false;
      const matchResult = counter.textContent?.match(/^(\d+) \/ (\d+)$/);
      return matchResult !== null && matchResult !== undefined && Number(matchResult[1]) === 1;
    },
    undefined,
    { timeout: 3000 },
  );
}

export async function fillTextInput(page: Page, value: string): Promise<void> {
  const textInput = page.locator("input[type='text']").first();
  await textInput.waitFor({ state: "visible", timeout: 10000 });
  await textInput.click({ clickCount: 3 });
  await textInput.fill(value);
  await textInput.press("Tab");
}

export async function fillNumberInput(page: Page, value: number): Promise<void> {
  const numInput = page.locator("input[type='number']").first();
  await numInput.waitFor({ state: "visible", timeout: 10000 });
  await numInput.click({ clickCount: 3 });
  await numInput.fill(String(value));
  await numInput.press("Tab");
}

export async function fillNthTextInput(page: Page, nthIndex: number, value: string): Promise<void> {
  const inputs = page.locator("input[type='text']");
  await inputs.nth(nthIndex).waitFor({ state: "visible", timeout: 10000 });
  await inputs.nth(nthIndex).click({ clickCount: 3 });
  await inputs.nth(nthIndex).fill(value);
  await inputs.nth(nthIndex).press("Tab");
}

export async function ensureModalClosed(page: Page): Promise<void> {
  const dialog = page.locator("[role='dialog']");
  const isOpen = await dialog.isVisible().catch(() => false);
  if (isOpen) {
    const closeBtn = page.locator("button[aria-label='Close command palette']");
    await closeBtn.click();
    await page
      .waitForSelector("[role='dialog']", { state: "detached", timeout: 3000 })
      .catch(() => {});
  }
}

export async function selectAlgorithm(page: Page, name: string): Promise<void> {
  await ensureModalClosed(page);
  const selectorBtn = page.locator("button[aria-label='Search algorithms']");
  await selectorBtn.click();
  await page.waitForSelector("[role='dialog']", { timeout: 3000 });
  const searchInput = page.locator("#algo-search-input");
  await searchInput.fill(name.slice(0, 6));
  const optionBtn = page
    .locator("[role='dialog']")
    .getByRole("button", { name, exact: true })
    .first();
  await optionBtn.waitFor({ timeout: 3000 });
  await optionBtn.click();
  await page.waitForSelector("[role='dialog']", { state: "detached", timeout: 4000 });
  await getStepCounter(page).waitFor({ timeout: 5000 });
}

export async function goToLastStep(page: Page): Promise<void> {
  const stepInfo = await getStepIndex(page);
  if (!stepInfo) throw new Error("No step counter found");

  const bar = page.locator("input[type='range'][aria-label='Playback progress']");
  await bar.waitFor({ timeout: 3000 });
  const box = await bar.boundingBox();
  if (!box) throw new Error("Progress bar not found");

  await page.mouse.click(box.x + box.width * 0.99, box.y + box.height / 2);

  await page.waitForFunction(
    (total) => {
      const spans = [...document.querySelectorAll("span")];
      const counter = spans.find((spanEl) => /^\d+ \/ \d+$/.test(spanEl.textContent ?? ""));
      if (!counter) return false;
      const matchResult = counter.textContent?.match(/^(\d+) \/ (\d+)$/);
      return matchResult !== null && matchResult !== undefined && Number(matchResult[1]) === total;
    },
    stepInfo.total,
    { timeout: 5000 },
  );
}

export async function getDisplayedArrayValues(page: Page): Promise<number[] | null> {
  return page.evaluate(() => {
    const barContainer = document.querySelector(".flex.flex-1.justify-center.gap-1");
    if (!barContainer) return null;

    const bars = barContainer.querySelectorAll(":scope > div");
    const values: number[] = [];
    for (const bar of bars) {
      const valueSpan = bar.querySelector("span.font-mono.text-xs");
      if (valueSpan) {
        const parsed = Number(valueSpan.textContent);
        if (!Number.isNaN(parsed)) {
          values.push(parsed);
        }
      }
    }
    return values.length > 0 ? values : null;
  });
}
