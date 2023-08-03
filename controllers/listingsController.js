const BaseController = require("./baseController");

class ListingsController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */

  // onLogin check if user exists, if not create
  async login(req, res) {
    const user = req.body;
    console.log(user);
    const { given_name, family_name, email } = req.body;
    const givenName = given_name;
    const familyName = family_name;
    console.log(givenName, familyName);
    try {
      console.log("I'm in login try: b4 findone");
      const [checkedUser, created] = await this.userModel.findOrCreate({
        where: { email: email },
        defaults: {
          firstName: givenName,
          lastName: familyName,
          phoneNum: null,
          email: email,
        },
      });

      if (created) {
        console.log("User Created!");
      }

      return res.json({ checkedUser });
    } catch (err) {
      console.log(err.message);

      console.log("I'm in login catch-try-catch: error");
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Create listing. Requires authentication.
  async insertOne(req, res) {
    console.log(req.body.title);
    console.log(req.body.currUser.id);
    const {
      title,
      category,
      condition,
      price,
      description,
      shippingDetails,
      currUser,
    } = req.body;
    console.log(currUser);
    const { id } = currUser;
    try {
      // TODO: Get seller email from auth, query Users table for seller ID
      // already retrieved user from Login function above

      // Create new listing
      const newListing = await this.model.create({
        title: title,
        category: category,
        condition: condition,
        price: price,
        description: description,
        shippingDetails: shippingDetails,
        buyerId: null,
        sellerId: id, // TODO: Replace with seller ID of authenticated seller
      });

      // Respond with new listing
      return res.json(newListing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific listing. No authentication required.
  async getOne(req, res) {
    const { listingId } = req.params;

    try {
      const output = await this.model.findByPk(listingId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Buy specific listing. Requires authentication.
  async buyItem(req, res) {
    const { listingId } = req.params;
    const currUser = req.body;
    try {
      const data = await this.model.findByPk(listingId);

      // TODO: Get buyer email from auth, query Users table for buyer ID
      await data.update({ buyerId: currUser.id }); // TODO: Replace with buyer ID of authenticated buyer

      // Respond to acknowledge update
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ListingsController;
