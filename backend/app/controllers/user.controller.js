const {
  successResponse,
  successfullyCreatedResponse,
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
  unauthorizedResponse,
} = require("../utils/responses");
// Validation
// import { CreateNewValidationSchema } from "../validations/create-review.validation.js";

// Model
const UserModel = require("../models/user.model");

const createNewUser = async (req, res) => {
  try {
    // const { value, error } = CreateNewValidationSchema.validate(req.body);
    // if (error) {
    //   return badRequestResponse(res, error?.details[0]?.message);
    // }

    const newUser = await UserModel.create({
      ...req.body,
    });

    return successfullyCreatedResponse(
      res,
      newUser,
      "User Created Successfully."
    );
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, "Server Error");
  }
};

const listAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find().lean();
    return successResponse(res, allUsers);
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};

const listSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return badRequestResponse(res, "Provide User Id");
    }
    const singleUser = await UserModel.findOne({ _id: id })
      .populate({
        path: "P5.history.givenTo",
        model: "Users",
      })
      .populate({
        path: "Reward.history.givenBy",
        model: "Users",
      })
      .lean();
    return successResponse(res, singleUser);
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return badRequestResponse(res, "Provide User Id");
    }
    const deleteUser = await UserModel.findByIdAndDelete(id);
    if (!deleteUser) {
      return badRequestResponse(res, "User does not exist");
    }
    return successResponse(res, deleteUser, "User Deleted .");
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return badRequestResponse(res, "Please Provide User Id");
    }

    // const { value, error } = CreateNewValidationSchema.validate(req.body);
    // if (error) {
    //   return badRequestResponse(res, error?.details[0]?.message);
    // }

    const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateUser) {
      return badRequestResponse(res, "User does not exist");
    }
    return successResponse(res, updateUser, "User Updated Successfully.");
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};

const updateReward = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return badRequestResponse(res, "Please Provide User Id");
    }

    // const { value, error } = CreateNewValidationSchema.validate(req.body);
    // if (error) {
    //   return badRequestResponse(res, error?.details[0]?.message);
    // }

    const updateUser = await UserModel.findOne({ _id: id });
    const giveToUser = await UserModel.findOne({
      _id: req?.body?.user_id,
    });

    if (!updateUser || !giveToUser) {
      return badRequestResponse(res, "User does not exist");
    }
    if (updateUser.P5.balance < req?.body?.amount || req?.body?.amount <= 0) {
      return badRequestResponse(res, "Not Enough Balance");
    }
    const P5values = {};
    P5values["amount"] = req?.body?.amount;
    P5values["givenTo"] = req?.body?.user_id;
    P5values["dateStamp"] = new Date().toString();
    updateUser.P5.balance = updateUser.P5.balance - req?.body?.amount;
    updateUser.P5.history.push(P5values);
    updateUser.save();

    const RewardValues = {};

    RewardValues["amount"] = req?.body?.amount;
    RewardValues["givenBy"] = id;
    RewardValues["dateStamp"] = new Date().toString();
    giveToUser.Reward.balance = giveToUser.Reward.balance + req?.body?.amount;
    giveToUser.Reward.history.push(RewardValues);

    giveToUser.save();

    return successResponse(res, updateUser, "Reward Transaction Successfully.");
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};

const revertReward = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return badRequestResponse(res, "Please Provide User Id");
    }

    // const { value, error } = CreateNewValidationSchema.validate(req.body);
    // if (error) {
    //   return badRequestResponse(res, error?.details[0]?.message);
    // }

    const { user_id, amount } = req.body;

    const updateUser = await UserModel.findOne({ _id: id });
    const giveToUser = await UserModel.findOne({
      _id: user_id,
    });

    if (!updateUser || !giveToUser) {
      return badRequestResponse(res, "User does not exist");
    }

    updateUser.P5.balance = updateUser.P5.balance + req?.body?.amount;
    updateUser.P5.history = updateUser.P5.history.filter((value) => {
      value.amount != amount && value.givenTo.toString() != user_id;
    });
    updateUser.save();

    giveToUser.Reward.balance = giveToUser.Reward.balance - req?.body?.amount;
    giveToUser.Reward.history = giveToUser.Reward.history.filter((value) => {
      value.amount != amount && value.givenBy.toString() != id;
    });

    giveToUser.save();

    return successResponse(res, updateUser, "Reward Transaction Reverted.");
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};
module.exports = {
  createNewUser,
  listAllUsers,
  listSingleUser,
  revertReward,
  deleteUser,
  updateUser,
  updateReward,
};
