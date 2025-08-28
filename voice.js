import say from 'say';
import fs from 'fs';
import { exec } from 'child_process';

// Text-to-speech
export const speak = (text) => {
    say.speak(text);
};

// Placeholder for voice-to-text (Whisper integration later)
export const listen = async () => {
    // Record audio and send to Whisper API
    return "Search for OpenAI Agent SDK on Google";
};
