// const insertTestData = async (User, Movie) => {
//     console.log("inserting test data")
//
//     const jane = await User.create({
//         id: 1,
//         name: 'jane doe',
//         numberOfReviews: 0,
//         bio: 'i am jane doe'
//     });
//     console.log(jane.toJSON());
//
//     const aliens = await Movie.create({
//         id: 1,
//         title: 'aliens',
//         reviewedBy: 1
//     });
//     console.log(aliens.toJSON());
// };

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