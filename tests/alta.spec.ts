import { test, expect } from "@playwright/test";

test("Page loads and main elements exist", async ({ page }) => {
  await page.goto("https://development.pagatelia.com/alta/");
  await page.click('button:has-text("Aceptar")');
  await expect(page.getByText("Datos personales")).toBeVisible();
  await expect(page.locator("#email")).toBeVisible();
});


test.describe("Email validation", () => {
  test("Invalid email format shows error", async ({ page }) => {
    await page.goto("https://development.pagatelia.com/alta/");

    await page.fill("#email", "invalidemail");
    await page.fill("#emailRepeat", "invalidemail");
    await page.click("#continueButton");

    await expect(page.locator("#email-error")).toBeVisible();
  });


  test("Mismatched emails show error", async ({ page }) => {
    await page.goto("https://development.pagatelia.com/alta/");

    await page.fill("#email", "test@example.com");
    await page.fill("#emailRepeat", "test2@example.com");
    await page.click("#continueButton");

    await expect(page.locator("#emailRepeat-error")).toBeVisible();
 });


  test("Valid email passes", async ({ page }) => {
    await page.goto("https://development.pagatelia.com/alta/");

    await page.fill("#email", "valid@example.com");
    await page.fill("#emailRepeat", "valid@example.com");

    await expect(page.locator("#email-error")).toBeHidden();
    await expect(page.locator("#emailRepeat-error")).toBeHidden();
 });

});

test.describe("Password validation", () => {
  test("Non-matching passwords show error", async ({ page }) => {
    await page.goto("https://development.pagatelia.com/alta/");

    await page.fill("#password", "Password123");
    await page.fill("#passwordRepeat", "Different123");
    await page.click("#continueButton");

    await expect(page.locator("#passwordRepeat-error")).toBeVisible();
    });

    test("Valid matching passwords pass", async ({ page }) => {
        await page.goto("https://development.pagatelia.com/alta/");

        await page.fill("#password", "Password123!");
        await page.fill("#passwordRepeat", "Password123!");

        await expect(page.locator("#password-error")).toBeHidden();
        await expect(page.locator("#passwordRepeat-error")).toBeHidden();
        });


});
test.describe("Personal data validation", () => {
  test("Individual vs company toggling works", async ({ page }) => {
    await page.goto("https://development.pagatelia.com/alta/");

    await page.click("#personType-individual");
    await expect(page.locator("#companyName")).toBeHidden();

    await page.click("#personType-company");
    await expect(page.locator("#companyName")).toBeVisible();
    });
  test("NIF validation works", async ({ page }) => {
    await page.goto("https://development.pagatelia.com/alta/");

    await page.fill("#nif", "12345678A");
    await expect(page.locator("#nif-error")).toBeHidden();
    });


});

