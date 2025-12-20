const { StatusCodes } = require("http-status-codes");
const { User, Role } = require("../models/index");
const ClientError = require("../utils/client_error");
const ValidationError = require("../utils/validation_error");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      console.log("Something went wrong in the repository layer");
      throw error;
    }
  }

  async destory(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        arguments: ["id", "email"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "User with the given email not found",
          "Please check the email entered",
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: { name: "ADMIN" },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
