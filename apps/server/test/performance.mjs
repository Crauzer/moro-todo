import fetch from 'node-fetch';

const NUMBER_OF_REQUESTS = 100;

for (let i = 0; i < NUMBER_OF_REQUESTS; i++) {
    fetch(
        'http://localhost:8080/tasks/V1StGXR8_Z5jdHi6B-myT',
        {
            method: 'POST',
            json: true,
            body: {text: "test" + i}
        }
    ).then(() => {console.log(`${i} completed`)})
}
