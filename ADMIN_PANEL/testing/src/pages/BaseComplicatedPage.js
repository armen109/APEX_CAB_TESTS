import { expect } from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { dashboardLocators } from '../utils/dashboard-data';

export class BaseComplicatedPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async scrollNotMainScroll(locator, coordinates) {
      await this.page.locator(locator).evaluate((el, coords) => {
        el.style.transform = `translate3d(0px, ${coords}px, 0px)`;
      }, coordinates);
  }

  async getDataFromTable(fields) {
    this.base.waitingFixedTime(2000)
    const requiredFields = fields.map(f => f.toLowerCase());
  
    const result = await this.page.evaluate(({ requiredFields }) => {
      const table = document.querySelector('table');
      if (!table) throw new Error('Table not found');
  
      const headers = Array.from(
        table.querySelectorAll('thead th')
      ).map(th => th.innerText.trim().toLowerCase());
      console.log(`Headers: \n ${headers}`)
  
      const columnIndexes = requiredFields.map(field => {
        const index = headers.findIndex(h => h === field);
        if (index === -1) {
          throw new Error(`Column "${field}" not found in table headers`);
        }
        return { field, index };
      });
  
      const rows = Array.from(table.querySelectorAll('tbody tr'));
      console.log(`Rows: \n ${rows}`)
  
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('td')).map(td =>
          td.innerText.trim()
        );
        console.log(cells);
  
        const rowData = {};
        let allFieldsPresent = true;
        
        for (const { field, index } of columnIndexes) {
          const value = cells[index];
          if (!value) {
            allFieldsPresent = false;
            break;
          }
          rowData[field] = value;
        }

        console.log(rowData);
  
        if (allFieldsPresent) {
          return rowData;
        }
      }
      throw new Error('No row contains all required fields');
    }, { requiredFields });
  
    return result;
  }
}
