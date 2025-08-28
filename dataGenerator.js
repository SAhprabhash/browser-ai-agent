import { faker } from '@faker-js/faker';



/**
 * Generate realistic LinkedIn personal data
 
export function generateLinkedInData() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: process.env.LINKEDIN_EMAIL, // use your LinkedIn email
        phone: faker.phone.number('##########'),
        headline: 'Software Developer',
        location: 'India',
        linkedinProfile: 'https://www.linkedin.com/in/yourprofile'
    };
}*/


export const generateFormData = (fields) => {
    const data = {};
    let passwordValue = null;

    fields.forEach(field => {
        const key = field.name.toLowerCase();

        if (key.includes('first')) {
            data[field.name] = faker.person.firstName();
        } else if (key.includes('last')) {
            data[field.name] = faker.person.lastName();
        } else if (key.includes('email')) {
            data[field.name] = faker.internet.email();
        } else if (key.includes('password')) {
            if (!passwordValue) {
                passwordValue = faker.internet.password({ length: 12, memorable: true });
            }
            data[field.name] = passwordValue; // Use same password for confirmPassword too
        } else if (key.includes('username')) {
            data[field.name] = faker.internet.userName();
        } else {
            data[field.name] = faker.word.sample();
        }
    });

    return data;
};

