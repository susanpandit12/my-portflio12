import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test("portfolio renders its 3D scene and real destinations without runtime errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Susan Pandit/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HI, I’M SUSAN",
  );
  await expect(page.locator(".sculpture canvas")).toBeVisible();
  await expect(page.locator(".sculpture-fallback")).toHaveCount(0);
  await expect(page.getByText(/hot takes/i)).toHaveCount(0);
  await expect(page.getByRole("link", { name: /IT Sathi/ })).toHaveAttribute(
    "href",
    "https://itsathi.netlify.app/",
  );
  await expect(page.getByRole("link", { name: /IT Sathi/ })).toHaveCount(1);
  await expect(page.getByRole("link", { name: "View source" })).toHaveAttribute(
    "href",
    "https://github.com/susanpandit12/my-portflio12",
  );
  await expect(
    page.getByRole("link", { name: "Have an idea?" }),
  ).toHaveAttribute("href", "mailto:susan.pandit98@gmail.com");
  expect(errors).toEqual([]);
});

test("motion control pauses the live scene and restarts it", async ({
  page,
}) => {
  await page.goto("/");
  const canvas = page.locator(".sculpture canvas");
  await expect(canvas).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1100);
  await page.getByRole("button", { name: "Pause motion" }).click();
  await expect(page.locator(".site-wrapper")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  const still = await canvas.screenshot();
  await page.waitForTimeout(250);
  expect((await canvas.screenshot()).equals(still)).toBe(true);
  await page.getByRole("button", { name: "Play motion" }).click();
  await expect(page.locator(".site-wrapper")).toHaveAttribute(
    "data-motion",
    "playing",
  );
  await page.waitForTimeout(250);
  expect((await canvas.screenshot()).equals(still)).toBe(false);
});

test("expertise rows reveal useful detail with keyboard interaction", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: /01 Full-stack development/,
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#service-0")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(page.locator("#service-0")).toBeHidden();
});

test("mobile menu navigates, closes with Escape, and restores keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(page.getByRole("navigation")).toBeHidden();
  await menu.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("navigation")).toBeHidden();
});

test("responsive layouts, reduced motion, and accessibility", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await mkdir("artifacts", { recursive: true });
  await expect(
    page.getByRole("button", { name: "Motion disabled by system preference" }),
  ).toBeDisabled();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    await expect(page.locator(".site-wrapper")).toHaveAttribute(
      "data-motion",
      "paused",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const heading = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(heading.x + heading.width).toBeLessThanOrEqual(width + 1);
    if (width === 390 || width === 1440) {
      await page.screenshot({
        path: `artifacts/${width}-full.png`,
        fullPage: true,
      });
      await page.screenshot({ path: `artifacts/${width}-hero.png` });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    }
  }
});

test("a static sculpture remains available without WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (["webgl", "webgl2", "experimental-webgl"].includes(type)) return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto("/");
  await expect(page.locator(".sculpture-fallback")).toBeVisible();
  await expect(page.getByRole("link", { name: "Have an idea?" })).toBeVisible();
});
