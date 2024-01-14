const helper = require("../helper/helper");
const repository = require("../helper/repository");
const productsModel = require("../models/products");
const categoriesModel = require("../models/categories");


module.exports = {
  /**
   * ===================================================================================================================
   * Request for crete new Product.
   * ===================================================================================================================
   */
  create: (req, res) => {
    fnCreateProducts(req, res);
  },

  /**
   * ===================================================================================================================
   * Request for getting the list or single Product. 
   * ===================================================================================================================
   */
  get: async (req, res) => {
    fnGetProducts(req, res);
  },

  /**
   * ===================================================================================================================
   * General Request for update fields in a perticular product.
   * ===================================================================================================================
   */
  update: (req, res) => {
    fnUpdateProducts(req, res);
  },

  /**
   * ===================================================================================================================
   * Request to delete an product. This request will update isDeleted Field in a perticular product.
   * ===================================================================================================================
   */

  delete: (req, res) => {
    fnDeleteProducts(req, res);
  },

  /**
   * ===================================================================================================================
   * Request for getting the list of Products by category. 
   * ===================================================================================================================
   */

  getProductsByCategory: (req, res) => {
    fnGetProductsByCategory(req, res);
  },

  getCategories: (req, res) => {
    fnGetCategories(req, res);
  },
};

const fnCreateProducts = async (req, res) => {
  try {
    let body = req.body;

    const data = await repository.save(productsModel, body);

    return res.status(200).json(helper.SuccessMessage(data));
  } catch (error) {
    return res.status(500).json(helper.errorMessage(error));
  }
};

const fnGetProducts = async (req, res) => {
  try {
    let isSingle = false;
    let query = req.query ? req.query : {};

    if (req.params && req.params.id) {
      query = {
        _id: req.params.id,
      };
      isSingle = true;
    }

    let data = await repository.get(
      productsModel,
      query,
      isSingle,
      null,
      "-createdAt",
      null,
      null,
      null,
      true
    );

    return res.status(200).json(helper.SuccessMessage(data));
  } catch (error) {
    return res.status(500).json(helper.errorMessage(error));
  }
};

const fnUpdateProducts = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res
        .status(200)
        .json(helper.errorMessage(helper.statusMessages.parameter_Missing + "Id is Missing"));
    }

    //Update
    const data = await repository.update(
      productsModel,
      { _id: req.params.id },
      req.body
    );

    return res.status(200).json(helper.SuccessMessage(data));
  } catch (error) {
    return res.status(200).json(helper.errorMessage(error));
  }
};

const fnDeleteProducts = async (req, res) => {
  try {
    if (req.params && req.params.id) {
      let query = {
        _id: req.params.id,
      };

      let Products = await repository.get(
        productsModel,
        query,
        true,
        "_id name",
        null,
        null,
        null,
        null,
        true
      );

      if (!Products) {
        return res.status(200).json(helper.errorMessage("Products Not Found"));
      }

      let data = await repository.delete(
        productsModel,
        query
      );

      return res.status(200).json(helper.SuccessMessage(data));
    } else {
      return res
        .status(200)
        .json(helper.error_message(helper.statusMessages.parameter_Missing));
    }
  } catch (error) {
    return res.status(200).json(helper.errorMessage(error));
  }
};

const fnGetProductsByCategory = async (req, res) => {
  try {
    if (!req.params || !req.params.category) {
      return res
        .status(200)
        .json(helper.errorMessage(helper.statusMessages.parameter_Missing));
    }

    let data = await repository.get(
      productsModel,
      { category: req.params.category },
      false,
      null,
      "-createdAt",
      null,
      null,
      null,
      true
    );

    return res.status(200).json(helper.SuccessMessage(data));
  } catch (error) {
    return res.status(200).json(helper.errorMessage(error));
  }
};

const fnGetCategories = async (req, res) => {
  try {
    
    let data = await repository.get(
      categoriesModel,
      { },
      false,
      null,
      "-createdAt",
      null,
      null,
      null,
      true
    );

    return res.status(200).json(helper.SuccessMessage(data));
  } catch (error) {
    return res.status(200).json(helper.errorMessage(error));
  }
};