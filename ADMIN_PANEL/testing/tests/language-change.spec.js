import { expect, test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { loginConstants } from '../src/utils/login-data';
import { generalConstants } from '../src/utils/general-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';

// Setup: Login before each test
test.beforeEach(async ({ page }) => {
  const basePage = new BasePage(page);
  const loginPage = new LoginPage(page);
  
  await basePage.visitURL(generalConstants.admin_panel_url);
  await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
  await basePage.assertURL(dashboardConstants.dashboard_url);
  await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
});

test('changing language to Armenian', async ({ page }) => {
     const dashboardPage = new DashboardPage(page);

     await dashboardPage.changeLanguage(dashboardConstants.armenian_language);
     await dashboardPage.verifyLanguageChange(dashboardLocators.armenian_changed_assertion);
});

test('changing language to Russian', async ({ page }) => {
     const dashboardPage = new DashboardPage(page);

     await dashboardPage.changeLanguage(dashboardConstants.russian_language);
     await dashboardPage.verifyLanguageChange(dashboardLocators.russian_changed_assertion);
});
