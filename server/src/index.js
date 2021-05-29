const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { RESTDataSource } = require("apollo-datasource-rest");

class MvrpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080";
  }

  async getDocumets(query) {
    const result = await this.get("search", {
      query,
    });
    return result.documents;
  }
}

const resolvers = {
  Query: {
    info: () => `This is the API for searching`,

    get_docs: async (root, { query }, { dataSources }) => {
      const result = await dataSources.mvrpAPI.getDocumets(query);
      return result;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  dataSources: () => {
    return {
      mvrpAPI: new MvrpAPI(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
