const { RESTDataSource } = require("apollo-datasource-rest");

class MvrpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://localhost:8080";
  }

  async getDocumets() {
    const result = await this.get("search", {
      query,
    });

    return result;
  }
}
