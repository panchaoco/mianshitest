const { delay } = require('roadhog-api-doc');

const proxy = {
  /**
   * 获取推荐内容
   * @param req
   * @param res
   * @constructor
   */
  'GET /api/getAppListData': (req, res) => {
    const appListData = require('../src/data/appListData.json');
    const data = Object.assign({}, appListData);
    const query = req.query;
    if (query && query.page && query.page_size) {
      const { page, page_size } = query;
      data.feed.entry = data.feed.entry.slice(Number(page) - 1, Number(page) * Number(page_size))
      res.send(data);
      return;
    }
    res.send(data)
  }
}

export default delay(proxy, 1000);
