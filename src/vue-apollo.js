import Vue from 'vue'
import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"

Vue.use(VueApollo)

export function createProvider(options = {}) {
  const apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
      uri: "https://dsapi.1lo.li/api/graphql"
    })
  })
  return apolloProvider;
}

