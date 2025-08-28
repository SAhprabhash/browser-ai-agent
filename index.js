import { runAgent } from './browserAgent.js';
import { speak } from './voice.js';

const tasks = [
    { 
        instruction: "Fill out any signup form automatically", 
        url: "https://ui.chaicode.com/auth/signup" 
    }
];

(async () => {
    for (let task of tasks) {
        speak(`Starting task for URL: ${task.url}`);
        await runAgent(task.instruction, task.url);
    }
})();
    speak("Form filling complete.");
    console.log("All tasks completed.");
    


/*
    import { applyToMultipleJobs } from './linkedinAgent.js';
import { speak } from './voice.js';

const searchUrl = 'https://www.linkedin.com/jobs/search/?keywords=Software%20Developer&location=India';

(async () => {
    speak('Starting LinkedIn multiple job applications...');
    await applyToMultipleJobs(searchUrl, 5); // apply to 5 jobs
})();
    await page.click('button[type="submit"]');
    speak('Logged into LinkedIn');

    import { applyToMultipleJobs } from './linkedinAgent.js';
import { speak } from './voice.js';

const searchUrl = 'https://www.linkedin.com/jobs/search/?keywords=Software%20Developer&location=India';

(async () => {
    speak('Starting LinkedIn multiple job applications...');
    
    // Call the agent function which handles all Playwright logic internally
    await applyToMultipleJobs(searchUrl, 5); // apply to 5 jobs
})();*/
