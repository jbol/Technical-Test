import { test, expect } from "@playwright/test";

const URL = "https://development.pagatelia.com/alta/";


test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});


test.describe("Email validation", () => {
  test("Invalid email format shows error", async ({ page }) => {
    await page.fill("#Email", "invalidemail");
    await page.fill("#EmailCheck", "invalidemail");
    await page.click("#submitButton");

    await expect(page.locator("#Email-error")).toBeVisible();
  });


  test("Mismatched emails show error", async ({ page }) => {
    await page.fill("#Email", "test@example.com");
    await page.fill("#EmailCheck", "test2@example.com");
    await page.click("#submitButton");

    await expect(page.locator("#EmailCheck-error")).toBeVisible();
 });


  test("Valid email passes", async ({ page }) => {
    await page.fill("#Email", "valid@example.com");
    await page.fill("#EmailCheck", "valid@example.com");

    await expect(page.locator("#Email-error")).toBeHidden();
    await expect(page.locator("#EmailCheck-error")).toBeHidden();
 });

});

test.describe("Password validation", () => {
  test("Non-matching passwords show error", async ({ page }) => {
    await page.fill("#Password", "Password123");
    await page.fill("#PasswordCheck", "Different123");
    await page.click("#submitButton");

    await expect(page.locator("#PasswordCheck-error")).toBeVisible();
    });

  test("Valid matching passwords pass", async ({ page }) => {
    await page.fill("#Password", "Password123!");
    await page.fill("#PasswordCheck", "Password123!");

    await expect(page.locator("#Password-error")).toBeHidden();
    await expect(page.locator("#PasswordCheck-error")).toBeHidden();
    });


});
test.describe("Personal data validation", () => {
  test("Individual vs company toggling works", async ({ page }) => {
    await page.click("#IsParticular");
    // await expect(page.locator("#companyName")).toBeHidden();
    await expect(page.locator("#DocumentType")).toContainText("Pasaporte"); // DNI and NIE

    await page.click("#IsBusiness");
    //await expect(page.locator("#companyName")).toBeVisible();
    await expect(page.locator("#DocumentType")).toContainText("NIF");
    });
  test("NIF validation works", async ({ page }) => {
    await page.fill("#NIF", "12345678A");
    await expect(page.locator("#nif-error")).toBeHidden();
    });
  test("Second surname checkbox disables field", async ({ page }) => {
    await page.check("#NotHasSecondLastName");
    await expect(page.locator("#SecondLastName")).toBeDisabled();
    });
});

