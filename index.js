import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { getTeams } from './controllers/team.controller.js';
import { typeDefs } from './graphql_schema.js';
import { filterPlayerByName, getPlayer, getPlayers } from './controllers/player.controller.js';
import {getNew,getNewByCategory,getMyNewSearch}from './controllers/news.controller.js';
import mongoose from 'mongoose';
const db = mongoose.connect("mongodb://127.0.0.1:27017/baseDatos2", { useNewUrlParser: true, useUnifiedTopology: true });


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    players: async () => {
      return await getPlayers();
    },
    player: async (parent, args, context, info) => {
      return await getPlayer(args.id);
    },
    playerByName: async (parent, args, context, info) => {
      return await filterPlayerByName(args.name, args.limit);
    },
    teams: async () => {
      return await getTeams();
    },
    newsByUserId: async (parent, args, context, info)=>{
      
      return await getNew(args.id);
    },
    newsByCategory: async(parents, args, context, info)=>{

      return await getNewByCategory(args.name,args.id);
    },
    newsBySearch:async(parents, args, context, info)=>{
      return await getMyNewSearch(args.id,args.valor);
    },
    version: () => "1.2"
  },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 },
});

console.log(`🚀  Server ready at: ${url}`);