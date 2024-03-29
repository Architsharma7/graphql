const { UserList, MovieList } = require("../fakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const id = args.id;
      const movie = _.find(MovieList, { id: Number(id) });
      return movie;
    },
  },

  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      console.log(user);
      const lastID = UserList[UserList.length - 1].id;
      user.id = lastID + 1;
      UserList.push(user);
      return user;
    },

    updateUserName: (parent, args) => {
      // const user = args.input.id;
      const { id, newusername } = args.input;
      let updatedUser;
      UserList.forEach((user) => {
        if (user.id === id) {
          user.username = newusername;
          user = updatedUser;
        }
      });
      return updatedUser;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
