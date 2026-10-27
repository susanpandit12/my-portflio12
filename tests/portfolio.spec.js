import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test("toolbox transforms text, validates JSON, and prepares a project email", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#tools");
  await page
    .getByLabel("Your words, a little more organized.")
    .fill("Hello   world");
  await expect(page.getByText("2 words", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Clean spacing" }).click();
  await page.getByRole("button", { name: "UPPERCASE", exact: true }).click();
  await expect(page.locator("#studio-text")).toHaveValue("HELLO WORLD");
  await page.getByRole("button", { name: /02 JSON formatter/ }).click();
  await page.locator("#json-text").fill('{"ok":true}');
  await page.getByRole("button", { name: "Format JSON", exact: true }).click();
  await expect(page.locator("#json-text")).toHaveValue('{\n  "ok": true\n}');
  await page.locator("#json-text").fill("invalid");
  await page.getByRole("button", { name: "Format JSON", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("isn’t valid");
  await page.getByRole("button", { name: /03 Project brief/ }).click();
  await page
    .getByLabel("What are we building?")
    .selectOption("API integration");
  await page
    .getByLabel("Tell me a little about the idea")
    .fill("Connect my shop & inventory.");
  const email = await page
    .getByRole("link", { name: "Open email with brief" })
    .getAttribute("href");
  expect(decodeURIComponent(email)).toContain("Connect my shop & inventory.");
  expect(decodeURIComponent(email)).toContain(
    "Project inquiry: API integration",
  );
});

test("portfolio renders its 3D scene and real destinations without runtime errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Susan Pandit/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "CODE WITH",
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
  const portrait = page.getByRole("img", { name: "Susan Pandit" });
  await portrait.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      portrait.evaluate((image) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
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

test("desktop scrolling transforms the hero and advances the pinned story in both directions", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const art = page.locator(".sculpture");
  const startingTransform = await art.evaluate(
    (el) => getComputedStyle(el).transform,
  );
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: "instant" }));
  await expect
    .poll(() => art.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(startingTransform);
  expect((await page.locator(".hero-pin").boundingBox()).y).toBeCloseTo(80, 0);

  const scrollToChapter = async (progress) => {
    await page.locator("#perspective").evaluate((section, amount) => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + (section.offsetHeight - innerHeight) * amount,
        behavior: "instant",
      });
    }, progress);
  };
  for (const [progress, label] of [
    [0.05, "THE CURIOSITY"],
    [0.48, "THE CRAFT"],
    [0.9, "THE FEELING"],
    [0.05, "THE CURIOSITY"],
  ]) {
    await scrollToChapter(progress);
    await expect(
      page.locator(".story-panel.is-active .story-label"),
    ).toHaveText(label);
    expect((await page.locator(".story-pin").boundingBox()).y).toBeCloseTo(
      80,
      0,
    );
  }
  await mkdir("artifacts", { recursive: true });
  await page.screenshot({ path: "artifacts/desktop-scroll-story.png" });
  await page.getByRole("button", { name: "Pause motion" }).click();
  for (const panel of await page.locator(".story-panel").all())
    await expect(panel).toBeVisible();
  await expect(page.locator(".story-pin")).toHaveCSS("position", "relative");
  expect(errors).toEqual([]);
});

test("mobile scrolling keeps all story content readable without pinned panels", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".hero-pin")).toHaveCSS("position", "relative");
  await expect(page.locator(".story-pin")).toHaveCSS("position", "relative");
  for (const panel of await page.locator(".story-panel").all()) {
    await panel.scrollIntoViewIfNeeded();
    await expect(panel).toBeVisible();
    const box = await panel.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(390);
  }
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator(".contact-title")).toBeInViewport();
});

test("the laptop hero keeps its controls clear of the footer and the artwork", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".sculpture canvas")).toBeVisible();
  const actions = await page.locator(".hero-links").boundingBox();
  const bottom = await page.locator(".hero-bottomline").boundingBox();
  expect(actions.y + actions.height + 24).toBeLessThan(bottom.y);
  await expect(
    page.getByRole("link", { name: "Explore my work" }),
  ).toBeInViewport();
  await mkdir("artifacts", { recursive: true });
  await page.screenshot({ path: "artifacts/laptop-hero.png" });
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.getByRole("heading", { name: /IDEAS INTO/ }),
  ).toBeInViewport();
});
