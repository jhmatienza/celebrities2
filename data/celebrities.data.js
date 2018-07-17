const faker = require('faker');

module.exports = new Array(10).fill(null).map(() => {
    return {
        name: faker.name.findName(),
        occupation: faker.name.jobTitle(),
        catchPhrase: faker.lorem.sentence()
    }
});