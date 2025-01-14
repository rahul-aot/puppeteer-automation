
const { waitAndCheckInnerHtml, waitAndClick, waitAndType} = require('./utils')


async function checkExtensionData(page, name, number){
    console.log(`Checking ${name} ${number}`);
    await waitAndCheckInnerHtml(page, '.qpeTimerContainer > span:first-child',name);
    console.log("Closing Extension ");
    await waitAndClick(page, "svg[width='48']");
    await new Promise(resolve => setTimeout(resolve, 5000));
}

async function launchExtesion(page, name, number, selector){
    await waitAndClick(page, selector);
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('Extension launched')
    const usernameField = await page.$('input#username');
    const passwordField = await page.$('input#password');
    if (usernameField && passwordField) {
        console.log('Login fields detected. Filling credentials.');
        await waitAndType(page, '#username', 'aaronrahul2k03@gmail.com');
        await waitAndType(page, '#password', 'Rahul@123');
        await waitAndClick(page, 'button#loginBtn');
        console.log('Login successful. Checking extension data...');
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    await checkExtensionData(page, name, number);
}

async function editDectection(page) {
    await waitAndClick(page, '.qpeTabContainer .qpeTabOption:nth-child(3)');
    const textAreaSelector = 'textarea.qpeTextArea.custom-scrollbar'; // Adjust the selector as needed
    const newContent = `Good morning, how are you feeling today? Good morning doctor. I've been feeling bit under the weather lately, mostly fatigue and some mild headaches. I see. How long have you been experiencing these symptoms? It has been about a week now. I just thought it might be just a stress but hasn't improved. Have you noticed any other symptoms like fever, nausea or any changes in your appetite or weight. No fever or nausea. My appetite is fine but I lost a couple of pounds which I was expecting which I wasn't expecting yeah. Okay thanks for sharing that do you have any pre-existing medical conditions or are you taking any medications right now? No no chronic conditions I have multi-vitamin daily but nothing else. Have you recently change have you had any recent changes in your lifestyle like changes in your sleep pattern diet or exercise and routine i haven't been working late for the first i've been working late for the past a few weeks you know i haven't been sleeping well i'm usually active but i have had no time to exercise lately it sounds like stress and lack of forest could be contributing factors sometimes fatigue and headaches can also be linked to the poor sleep. How many hours of sleep are you getting on an average? Maybe five to six hours a night Oh ideally adults should aim to uh for aim for seven to nine hours of sleep lack of rest can lead to the symptoms um uh you are describing it could be that your hydration levels or stress levels are playing a role how is your water intake honestly not great i've been relying more on coffee lately to get through the day that might be contributing into headache as well. Coffin can be dehydrating if you are not balancing into water. I would suggest increasing your water intake, cutting back on caffeine, and trying to prioritize your sleep. That makes sense. I'll definitely work on that. Also, we'll run a few tests to rule out any other potential causes like anemia or thyroid issues. But based on what we have, but you have, told me it sounds more related to our lifestyle factors that's a relief to hear well get the results we'll get the test results in a few days in the meantime try to incorporate some light exercise even a 10 minute walk can help you reduce stress and of course focus on getting enough rest i will try that thank you great we have the test results we will review them you know once I have it and see if there any further action is needed do you have any other concerns questions no that covers it for now perfect take care of yourself we will follow up soon thank you doctor I appreciate it`;
    await page.waitForSelector(textAreaSelector);

    // Clear the text area
    await page.$eval(textAreaSelector, (textArea) => {
        textArea.value = ''; // Clear the content
        textArea.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
    });

    // Type the new content
    await page.type(textAreaSelector, newContent);

    // Optional: Wait to observe the result
    await new Promise(resolve => setTimeout(resolve, 3000));
}

async function generateSoapNote( page ){
    await waitAndClick(page, '.qpeTabContainer .qpeTabOption:nth-child(4)');
    await new Promise(resolve => setTimeout(resolve, 3000));
}




module.exports = { checkExtensionData, launchExtesion, editDectection, generateSoapNote }