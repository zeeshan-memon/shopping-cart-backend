const mongoose = require("mongoose");
const moment = require("moment");

exports.errorMessage = (error) => {
  console.log(
    `|======================= TIMESTAMP ${new Date()}========================|`
  );
  console.log(error);
  console.log("|======================== ERROR  END  =======================|");
  return {
    status: false,
    response: null,
    error: errorMessage(error),
  };
};

exports.SuccessMessage = (response) => {
  return {
    status: true,
    response: response,
    error: null,
  };
};

exports.toBoolean = (text) => {
  return text === "true" ? true : false;
};



exports.statusMessages = {
  
  fields_missing: "Required field missing.",
  not_found: "No Record Found.",
  parameter_Missing: "Request Parameter Missing",
  invalid_id: "You have provided an invalid id ",
};

/**
 * ===================================================================================================================
 * General Method which handle mongoose validators and general exception errors
 * ===================================================================================================================
 */

const errorMessage = (e) => {
  /* istanbul ignore next */
  if (e.msg && e.param) {
    return `${e.msg}: ${e.param} `;
  } else if (e.code && e.code === 11000) {
    const key = Object.keys(e.keyValue)[0];
    let fieldName = key.replace(".", " ");
    return `${fieldName} ${this.statusMessages.already_Exist} : ${e.keyValue[key]}`;
  } else if (
    e.errors &&
    e.errors[Object.keys(e.errors)[0]].name == "CastError"
  ) {
    return `${this.statusMessages.invalid_id} ${Object.keys(
      e.errors
    )[0].replace(".", " ")}`;
  } else if (
    e.errors &&
    e.errors[Object.keys(e.errors)[0]].properties.type == "required"
  ) {
    return `${this.statusMessages.fields_missing} ${Object.keys(
      e.errors
    )[0].replace(".", " ")}`;
  } else if (e.name && e.name == "CastError") {
    return `${this.statusMessages.invalid_id}: ${e.value}`;
  } else if (e.message) {
    return e.message;
  } else {
    return e;
  }
};

/**
 * ===================================================================================================================
 * General Method to convert string to mongoose Object
 * ===================================================================================================================
 */

exports.toMongooseObjectId = (e) => {
  return mongoose.Types.ObjectId(e);
};

/**
 * ===================================================================================================================
 * Method to get the start time of the date
 * ===================================================================================================================
 */

exports.startTimeOfDate = (time, date) => {
  if (date) {
    return moment(new Date(date)).startOf(time).toDate();
  } else {
    return moment().startOf(time).toDate();
  }
};

/**
 * ===================================================================================================================
 * Method to get the end time of the date
 * ===================================================================================================================
 */

exports.endTimeOfDate = (time, date) => {
  if (date) {
    return moment(new Date(date)).endOf(time).toDate();
  } else {
    return moment().endOf(time).toDate();
  }
};

exports.fix = (value) => {
  value = parseFloat(value).toFixed(4);
  return value;
};

/**
 * ===================================================================================================================
 * General Method to remove milliseconds from time object.
 * ===================================================================================================================
 */

exports.removeMilliseconds = (dt) => {
  let date = new Date(dt);
  date.setMilliseconds("000");
  return date;
};
