import { chromium } from 'playwright';
import { speak } from './voice.js';
import { generateFormData } from './dataGenerator.js';

/**
 * Fill a field using multiple fallback selectors
 */
async function fillField(page, fieldKey, value) {
    const selectors = [
        `input[name="${fieldKey}"]`,
        `input[id="${fieldKey}"]`,
        `input[placeholder*="${fieldKey}"]`,
        `input[aria-label*="${fieldKey}"]`
    ];

    for (let selector of selectors) {
        const el = page.locator(selector);
        if (await el.count() > 0) {
            try {
                await el.fill(value);
                console.log(`Filled ${fieldKey} using selector: ${selector}`);
                return true;
            } catch (err) {
                console.warn(`Failed to fill ${fieldKey} with selector ${selector}:`, err.message);
            }
        }
    }

    console.warn(`Could not find input for field: ${fieldKey}`);
    return false;
}

export const runAgent = async (instruction, url) => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    // Detect all input fields
    const inputFields = await page.$$eval('input', inputs =>
        inputs.map(input => ({
            name: input.name || input.id || '',
            type: input.type || 'text',
            placeholder: input.placeholder || ''
        }))
    );

    console.log("Detected input fields:", inputFields);

    // Generate realistic random data for each field
    const formData = generateFormData(inputFields);
    console.log("Generated Form Data:", formData);
    speak("Filling form with generated data.");

    // Fill all fields dynamically
    for (let key in formData) {
        await fillField(page, key, formData[key]);
    }

    // Click the submit button
    const submitButton = await page.$(
        'button[type="submit"], button:has-text("Sign Up"), input[type="submit"]'
    );

    if (submitButton) {
        await submitButton.click();
        speak("Form submitted successfully!");
        console.log("Form submitted!");
    } else {
        console.log("Submit button not found!");
    }

    setTimeout(async () => await browser.close(), 10000);
};
