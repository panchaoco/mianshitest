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
    const data = JSON.parse(JSON.stringify(appListData));
    const query = req.query;
    if (query && query.page && query.page_size) {
      const page = Number(query.page);
      const page_size = Number(query.page_size);
      data.feed.attributes = {
        total: appListData.feed.entry.length,
        page,
        page_size
      }
      data.feed.entry = data.feed.entry.slice((page - 1) * page_size, page * page_size)
      res.send(data);
      return;
    }
    res.send(data)
  }
}

export default delay(proxy, 1000);
