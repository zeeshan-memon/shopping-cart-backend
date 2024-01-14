"use strict";

exports.get = async (
  model,
  query,
  isSingle,
  selectParams,
  sortParams,
  limit,
  isDeleted,
  skip,
  isLean = false
) => {
  
    if (isSingle) {
      return await model
        .findOne(query)
        .select(selectParams || "")
        .lean(isLean)
        .exec();
    } else {
      
      return await model
        .find(query)
        .select(selectParams || "")
        .sort(sortParams || "")
        .skip(skip)
        .limit(limit)
        .lean(isLean)
        .exec();
    }

};

exports.save = async (model, saveObj) => {
   return await model.create(saveObj)
};

exports.update = async (model, query, updateData) => {

  return await model.findOneAndUpdate(query, updateData);
};

exports.delete =async (model, query) => {

   return await model.findOneAndDelete(query);
};

