import { test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { loginConstants } from '../src/utils/login-data';
import { generalConstants } from '../src/utils/general-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';

test('logging out', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
     await dashboardPage.logOut();
     await basePage.assertURL(generalConstants.admin_panel_url);
     await basePage.assertContaining();

});
