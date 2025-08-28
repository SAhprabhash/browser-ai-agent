/*import { chromium } from 'playwright';
import { generateLinkedInData } from './dataGenerator.js';
import { speak } from './voice.js';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Simulate human typing
 */
async function typeHumanLike(element, text) {
    for (let char of text) {
        await element.type(char, { delay: 100 + Math.random() * 100 }); // 100-200ms per character
    }
}

/**
 * Fill all standard input fields dynamically
 *
async function fillAllInputs(page, formData) {
    const inputFields = await page.$$('input');
    for (const field of inputFields) {
        const name = (await field.getAttribute('name')) || '';
        const aria = (await field.getAttribute('aria-label')) || '';
        const placeholder = (await field.getAttribute('placeholder')) || '';

        for (let key in formData) {
            if (
                name.toLowerCase().includes(key.toLowerCase()) ||
                aria.toLowerCase().includes(key.toLowerCase()) ||
                placeholder.toLowerCase().includes(key.toLowerCase())
            ) {
                await typeHumanLike(field, formData[key]);
                console.log(`Filled ${key} with ${formData[key]}`);
                await page.waitForTimeout(500 + Math.random() * 1000);
            }
        }
    }
}


 //Fill checkboxes, radio buttons, dropdowns
async function fillAllSelectables(page) {
    const checkboxes = await page.$$('input[type="checkbox"]');
    for (const box of checkboxes) {
        if (!(await box.isChecked())) await box.check();
        await page.waitForTimeout(300 + Math.random() * 500);
    }

    const radios = await page.$$('input[type="radio"]');
    for (const radio of radios) {
        if (await radio.isVisible()) await radio.check();
        await page.waitForTimeout(300 + Math.random() * 500);
    }

    const selects = await page.$$('select');
    for (const sel of selects) {
        const options = await sel.$$('option');
        if (options.length > 1) await sel.selectOption(options[1].getAttribute('value'));
        await page.waitForTimeout(300 + Math.random() * 500);
    }
}


 // Apply to a single LinkedIn job
 
async function applyToJob(page, jobUrl, formData) {
    if (jobUrl.includes('BUDGET_EXHAUSTED_JOB') || jobUrl.includes('EXTERNAL_APPLICATION')) {
        console.log('Skipping ineligible job:', jobUrl);
        return;
    }

    await page.goto(jobUrl);
    speak('Navigated to job posting');
    await page.waitForTimeout(1000 + Math.random() * 1000);

    const easyApplyButton = await page.$('button:has-text("Easy Apply")');
    if (!easyApplyButton || !(await easyApplyButton.isVisible())) {
        console.log('Easy Apply not available or hidden. Skipping job.');
        return;
    }

    try {
        await easyApplyButton.click({ timeout: 5000 });
    } catch {
        console.log('Could not click Easy Apply. Skipping job.');
        return;
    }

    await page.waitForTimeout(2000 + Math.random() * 1000);

    // Multi-step form filling
    while (true) {
        await fillAllInputs(page, formData);
        await fillAllSelectables(page);

        const nextBtn = await page.$('button:has-text("Next"), button:has-text("Submit application")');
        if (!nextBtn) break;

        try {
            await nextBtn.click();
        } catch {
            console.log('Could not click Next. Ending this application.');
            break;
        }
        await page.waitForTimeout(1000 + Math.random() * 2000);
    }

    // Upload resume if file input exists
    const fileInput = page.locator('input[type="file"]');
    if ((await fileInput.count()) > 0) {
        await fileInput.setInputFiles(process.env.RESUME_PATH);
        console.log('Uploaded resume');
        await page.waitForTimeout(1000 + Math.random() * 1000);
    }

    // Click final submit
    const submitButton = await page.$('button:has-text("Submit application")');
    if (submitButton) {
        await submitButton.click();
        speak('Job application submitted!');
        console.log('Application submitted!');
    } else {
        console.log('Submit button not found.');
    }

    await page.waitForTimeout(2000 + Math.random() * 2000);
}


 // Apply to multiple jobs from search results
 
export const applyToMultipleJobs = async (searchUrl, maxJobs = 5) => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // --- Login ---
    await page.goto('https://www.linkedin.com/login');
    await page.fill('input[name="session_key"]', process.env.LINKEDIN_EMAIL);
    await page.fill('input[name="session_password"]', process.env.LINKEDIN_PASSWORD);
    await page.click('button[type="submit"]');

    // Wait for profile nav bar instead of networkidle (SPA fix)
    try {
        await page.waitForSelector('nav[aria-label="Primary"]', { timeout: 30000 });
    } catch {
        console.log('Login page did not fully load. Continuing...');
    }

    speak('Logged in to LinkedIn');

    // Navigate to job search page
    await page.goto(searchUrl);
    speak('Navigated to job search page');
    await page.waitForTimeout(2000 + Math.random() * 2000);

    // Get unique job links
    const jobLinks = await page.$$eval('a[href*="/jobs/view/"]', links => {
        const urls = links.map(l => l.href);
        return [...new Set(urls)];
    });

    const formData = generateLinkedInData();

    // Apply to each job up to maxJobs
    for (let i = 0; i < Math.min(jobLinks.length, maxJobs); i++) {
        const jobUrl = jobLinks[i];
        console.log(`Applying to job: ${jobUrl}`);
        await applyToJob(page, jobUrl, formData);
    }

    speak('Finished applying to multiple jobs');
    setTimeout(async () => await browser.close(), 5000);
};*/
