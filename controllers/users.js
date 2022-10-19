


module.exports = {
  getUser: (req, res) => {
    fnGetUser(req, res);
  },
};

const fnGetUser = async (req, res) => {

  return res.status(200).json({ response: "Working" });
};
