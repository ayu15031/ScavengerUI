const { RESTDataSource } = require("apollo-datasource-rest");

class MvrpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
    this.initialize({});
  }

  async getDocumets(query) {
    const result = await this.get("search", {
      query,
    });
    return result;
  }
}

const mvrpAPI = new MvrpAPI();
const docs = mvrpAPI.getDocumets("hello");
console.log(docs);
