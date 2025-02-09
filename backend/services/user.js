import userModel from "../models/user.js";

const createUser = async ({ firstname, lastname = "", email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("Firstname, email, and password are required");
  }

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};

export default createUser;
