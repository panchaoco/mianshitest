const recommendData = require('../src/data/recomendData.json');
const { delay } = require('roadhog-api-doc');

const proxy = {
  'GET /api/getRecommendData': (req, res) => {
    res.send(recommendData)
  }
}

export default delay(proxy, 1000);
