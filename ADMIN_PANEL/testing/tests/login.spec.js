import { test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { loginConstants, loginLocators } from '../src/utils/login-data';
import { generalConstants } from '../src/utils/general-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';

test('login with valid credentials', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
});

test('login with invalid credentials', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);

    await basePage.visitURL(generalConstants.admin_panel_url)
    await loginPage.login(loginConstants.invalid_email, loginConstants.invalid_password);
    await basePage.assertURL(generalConstants.admin_panel_url);
    await basePage.shouldBeVisible(loginLocators.error_alert);
    await basePage.shouldInclude(loginLocators.error_alert, loginLocators.error_alert_text);
});
