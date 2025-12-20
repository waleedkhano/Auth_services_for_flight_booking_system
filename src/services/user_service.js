const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user_repo");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      //fetch user using email
      const user = await this.userRepository.getByEmail(email);

      //compare plain password with encrypted password
      const passwordMatch = this.checkpassord(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password does not match");
        throw { error: "Incorrect password" };
      }

      //create a JWT token and send it to the user
      const jwtToken = this.createToken({ email: user.email, id: user.id });
      return jwtToken;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation in service layer");
      throw error;
    }
  }

  checkpassord(userInputPlainPassword, encriptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encriptedPassword);
    } catch (error) {
      console.log("Something went wrong in password checking in service layer");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const result = await this.userRepository.isAdmin(userId);
      return result;
    } catch (error) {
      console.log(
        "Something went wrong in checking admin status in service layer"
      );
      throw error;
    }
  }
}

module.exports = UserService;
