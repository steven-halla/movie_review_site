const insertRolesData = async (Role) => {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
};

const insertMoviesData = async (Movie) => {
  Movie.create({
    id: 1,
    title: "Batman and Robin",
    rating: 5
  })
};

module.exports = {
  insertRolesData,
  insertMoviesData
};
export {};
