const { User, Visitor, Data } = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { passHelper, jwtHelper } = require("../helper/helper");
// const nodemailer = require("nodemailer");
// const {
//   weather,
//   currency,
//   xenditBalance,
//   xenditCreateVa,
//   xenditPayment,
//   xenditGetVa,
//   covidData,
// } = require("../apis/weatherApi");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user && passHelper.checkPass(password, user.password)) {
        let tokenPayload = { id: user.id, email: user.email, role: user.role };
        let access_token = jwtHelper.signPl(tokenPayload);

        res.status(200).json({
          id: user.id,
          email: user.email,
          role: user.role,
          access_token: access_token,
        });
      } else {
        throw { name: "unauthorized", message: "You dont have an access" };
      }
    } catch (err) {
      console.log(err);
      next(error);
    }
  }

  static async registerVisitor(req, res, next) {
    try {
      const { name, phone } = req.body;
      let createVisitor = await Visitor.create(
        {
          name,
          phone
        });
      if (createVisitor) {
        res.status(201).json({
          id: createVisitor.id,
          name: createVisitor.name,
          phone: createVisitor.phone
        });
      }
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      let createUser = await User.create(
        {
          name,
          email, 
          password: passHelper.hashPassword(password),
          role
        });
      if (createUser) {
        res.status(201).json({
          id: createUser.id,
          name: createUser.name,
          email: createUser.email,
          role: createUser.role,
        });
      }
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async allUser(req, res, next) {
    try {
      let response = await User.findAll({
        attributes: ['id','name', 'email','role']
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async allVisit(req, res, next) {
    try {
      let response = await Data.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Visitor,
          },
        ]
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async allVisitor(req, res, next) {
    try {
      let response = await Visitor.findAll();
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  //GET VA
}

module.exports = Controller;
