const { User, Visitor, Data } = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { passHelper, jwtHelper } = require("../helper/helper");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

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
          name: user.name,
          role: user.role,
          access_token: access_token,
        });
      } else {
        throw { name: "unauthorized", message: "You dont have an access" };
      }
    } catch (err) {
      next(err);
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
      //cari apakah udah pernah visit
      const {
        timeVisit,
        doctor,
        patient,
        doctorReference,
        visitReference,
        createdAt,
        admin,
      } = req.body;

      let findVisitor = await Data.findOne({
        where: { visitorAssigned: +patient },
      });

      if (findVisitor) {
        await Data.update(
          {
            isFirst: false,
          },
          { where: { id: findVisitor.id } }
        );
      }

      let createData = await Data.create({
        timeVisit,
        doctorAssigned: +doctor,
        visitReference: +visitReference || null,
        doctorReference: +doctorReference || null,
        visitorAssigned: +patient,
        admin: +admin,
        createdBy: req.user.id,
        isFirst: findVisitor ? false : true,
        createdAt,
      });
      if (createData) {
        res.status(201).json(createData);
      }
    } catch (err) {
      next(err);
    }
  }

  static async editVisit(req, res, next) {
    try {
      //cari apakah udah pernah visit
      const { status, totalSpend, updatedAt, timeVisit } = req.body;
      const { id } = req.user;
      const { id: idVisit } = req.params;
      console.log(req.body);

      let updateData = await Data.update(
        {
          status,
          timeVisit,
          totalSpend,
          updatedAt,
          updateBy: id,
        },
        { where: { id: idVisit } }
      );
      if (updateData) {
        res.status(200).json(updateData);
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
      let where = {};
      if (req.query.name) {
        where.name = {};
        where.name[Op.startsWith] = req.query.name;
      }
      let response = await Visitor.findAll({
        where,
        order: [["id", "DESC"]],
      });
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
          {
            model: Data,
            as: "visitReferenceFkId",
            include: [
              {
                model: User,
                as: "doctorFkId",
                attributes: ["id", "name", "email"],
              },
            ],
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
        order: [["createdAt", "DESC"]],
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
          {
            model: User,
            as: "doctorReferenceFkId",
            attributes: ["id", "name", "email"],
          },
          {
            model: Data,
            as: "visitReferenceFkId",
            // attributes: ["id", "name", "email"],
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
        attributes: [
          "doctorAssigned",
          [Sequelize.literal(`COUNT(*)`), "count"],
        ],
        group: ["doctorAssigned"],
        order: [["doctorAssigned", "ASC"]],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  //COUNT ADMIN
  static async CountAdmin(req, res, next) {
    try {
      let response = await Data.findAll({
        attributes: ["admin", [Sequelize.literal(`COUNT(*)`), "count"]],
        group: ["admin"],
        order: [["admin", "ASC"]],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  //COUNT PATIENT
  static async CountPatient(req, res, next) {
    try {
      let response = await Data.findAll({
        attributes: [
          "visitorAssigned",
          [Sequelize.literal(`COUNT(*)`), "count"],
        ],
        group: ["visitorAssigned"],
        order: [["visitorAssigned", "ASC"]],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  //COUNT EXPENSE EVERY PATIENT
  static async CountPatientFirst(req, res, next) {
    try {
      let response = await Data.findAll({
        where: { isFirst: true },
        attributes: ["doctorAssigned"],
        include: [
          {
            model: User,
            as: "doctorFkId",
            attributes: ["id", "name", "email"],
          },
          { model: Visitor, attributes: ["id", "name", "phone"] },
        ],
      });
      let doctorList = {};
      // console.log(response);
      response.map((e) => {
        if (doctorList[e.doctorFkId.name] === undefined) {
          doctorList[e.doctorFkId.name] = [e];
          return;
        }
        doctorList[e.doctorFkId.name].push(e);
        // if(doctorList.)
      });
      console.log(doctorList);
      res.status(200).json(doctorList);
    } catch (err) {
      next(err);
    }
  }

  //GET MedcardByPatientId
  static async MedcardByPatientId(req, res, next) {
    try {
      console.log(req);
      let response = await Data.findAll({
        where: { visitorAssigned: req.params.patientId },
        include: [
          {
            model: User,
            as: "doctorFkId",
            attributes: ["id", "name", "email"],
          },
          { model: Visitor, attributes: ["id", "name", "phone"] },
        ],
        attributes: ["id", "status", "timeVisit"],
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
        where: { role: ["doctor", "director"] },
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
