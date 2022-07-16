const { User, Visitor, Data } = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { passHelper, jwtHelper } = require("../helper/helper");

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
      let createVisitor = await Visitor.create({
        name,
        phone,
      });
      if (createVisitor) {
        res.status(201).json({
          id: createVisitor.id,
          name: createVisitor.name,
          phone: createVisitor.phone,
        });
      }
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async registerNewVisit(req, res, next) {
    try {
      const { timeVisit, doctor, patient, isFirst, createdAt, admin } =
        req.body;
      let createData = await Data.create({
        timeVisit,
        doctorAssigned: +doctor,
        visitorAssigned: +patient,
        admin: +admin,
        createdBy: req.user.id,
        isFirst,
        createdAt,
      });
      if (createData) {
        res.status(201).json(createData);
      }
    } catch (err) {
      next(err);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      let createUser = await User.create({
        name,
        email,
        password: passHelper.hashPassword(password),
        role,
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
        attributes: ["id", "name", "email", "role"],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async allVisit(req, res, next) {
    try {
      let response = await Data.findAll({
        // include: [
        //   {
        //     model: User,
        //   },
        //   {
        //     model: Visitor,
        //   },
        // ],
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

  //Get data visit by ID
  static async dataById(req, res, next) {
    try {
      const { id } = req.params;
      let response = await Data.findOne({
        where: { id: +id },
        include: [
          {
            model: User,
            as: "adminFkId",
            attributes: ["name", "email"],
          },
          {
            model: User,
            as: "doctorFkId",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "creatorFkId",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "updatorFkId",
            attributes: ["id", "name", "email"],
          },
          { model: Visitor, attributes: ["id", "name", "phone"] },
        ],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  //Get all data visit
  static async getAllData(req, res, next) {
    try {
      let response = await Data.findAll({
        include: [
          {
            model: User,
            as: "adminFkId",
            attributes: ["name", "email"],
          },
          {
            model: User,
            as: "doctorFkId",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "creatorFkId",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "updatorFkId",
            attributes: ["id", "name", "email"],
          },
          { model: Visitor, attributes: ["id", "name", "phone"] },
        ],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  //getalllistofDoctor
  static async Count(req, res, next) {
    try {
      let response = await Data.findAll({
        attributes: {
          include: [
            [
              sequelize.fn("COUNT(DISTINCT(doctorFkId))"),
              "doctorAssigned",
            ],
          ],
        },
        include: [
          {
            model: User,
            as: "doctorFkId",
            attributes: ["id", "name", "email"],
          },
        ],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  //getAllListOfDoctor
  static async listDoctors(req, res, next) {
    try {
      let response = await User.findAll({
        where: { role: "doctor" },
        attributes: ["id", "name", "email", "role"],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  //getAllListOfDoctor
  static async listAdmins(req, res, next) {
    try {
      let response = await User.findAll({
        where: { role: "admin" },
        attributes: ["id", "name", "email", "role"],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  //GET VA
}

module.exports = Controller;
