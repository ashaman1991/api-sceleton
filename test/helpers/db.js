const fs = require('fs');
const _ = require('lodash');
const path = require('path');

function getObjectId(id) {
  return _.padStart(id, 24, '0');
}

function populateDb() {
  const modelPath = path.join(__dirname, '/fixtures/');
  const models = fs.readdirSync(modelPath);
  const promises = models.map((filename) => {
    const modelName = filename.split('.')[0];
    const model = global[modelName];
    const data = require(`${modelPath}${filename}`); // eslint-disable-line
    return model.create(data);
  });
  return Promise.all(promises);
}

module.exports = {
  populateDb,
  getObjectId
};
