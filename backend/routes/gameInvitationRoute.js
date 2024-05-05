let express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
let Invitation = require("../models/invitation");
let User = require("../models/users");
const _ = require("underscore");
let unique = _.uniq;
let isEmpty = _.isEmpty;

//api to send gaming invitation information for single player
router.post(
  "/inviteSinglePlayer",
  asyncHandler(async (req, res) => {
    let invitorEmail = req.body.invitorEmail;
    let inviteeEmail = req.body.inviteeEmail;

    if (invitorEmail === inviteeEmail) {
      //no invotor found in the system
      return res
        .status(404)
        .json({ statusCode: 404, message: "You can not invite yourself." });
    }
    // find the invitor user
    const userInvitor = await User.find({ email: invitorEmail });
    const userInvitee = await User.find({ email: inviteeEmail });

    if (!userInvitor || !userInvitor.length) {
      //no invotor found in the system
      return res
        .status(404)
        .json({
          statusCode: 404,
          message: "Not be able to find the invitor in the system.",
        });
    }

    if (!userInvitee || !userInvitee.length) {
      //no invotor found in the system
      return res
        .status(404)
        .json({
          statusCode: 404,
          message: "Not be able to find the invitee in the system.",
        });
    }

    let phoneNumber = req.body.phoneNumber;
    let gamingDate = req.body.gamingDate;
    let gameStartTime = req.body.gameStartTime;
    let gameEndTime = req.body.gameEndTime;
    let address = req.body.address;
    let zipCode = req.body.zipCode;
    let notes = req.body.notes;

    let createInvitation = await new Invitation({
      invitorEmail: invitorEmail,
      inviteeEmail: [{ opponent: inviteeEmail }],
      phoneNumber: phoneNumber,
      gamingDate: gamingDate,
      gameStartTime: gameStartTime,
      gameEndTime: gameEndTime,
      address: address,
      zipCode: zipCode,
      note: notes,
    });

    let invitationRes;
    await createInvitation.save().then(
      (response) => {
        console.log("Promise resolved with value:", response);
        // Do something with the resolved value
        let invitationPlayers = {
          invitor: invitorEmail,
          invitee: inviteeEmail,
        };
        return res
          .status(200)
          .json({
            statusCode: 200,
            message: "Invitation Created for, " + userInvitor[0].name,
            body: invitationPlayers,
          });
      },
      (error) => {
        console.error("Promise rejected with error:", error.message);
        invitationRes = error;
        // Handle the error
        return res
          .status(404)
          .json({
            statusCode: 404,
            message: "Failed to invite gamers. " + invitationRes,
          });
      }
    );
  })
);

//api to send gaming invitation information for double players
router.post(
  "/inviteDoublePlayer",
  asyncHandler(async (req, res) => {
    let invitorEmail = req.body.invitorEmail;
    let invitorPartnerEmail = req.body.invitorPartnerEmail;
    let inviteePlayer1Email = req.body.inviteePlayer1Email;
    let inviteePlayer2Email = req.body.inviteePlayer2Email;

    let emailArr = [
      invitorEmail,
      invitorPartnerEmail,
      inviteePlayer1Email,
      inviteePlayer2Email,
    ];
    if (unique(emailArr).length !== 4) {
      return res
        .status(404)
        .json({
          statusCode: 404,
          message:
            "Not be able to invite same player to be your partner or opponent at the same time.",
        });
    }
    // find the invitor user
    const userInvitor = await User.find({ email: invitorEmail });
    const userInvitorPartner = await User.find({ email: invitorPartnerEmail });
    const opp1 = await User.find({ email: inviteePlayer1Email });
    const opp2 = await User.find({ email: inviteePlayer2Email });

    if (!userInvitor || !userInvitor.length) {
      //no invotor found in the system
      return res
        .status(404)
        .json({
          statusCode: 404,
          message: "Not be able to find the invitor in the system.",
        });
    }

    if (!userInvitorPartner || !userInvitorPartner.length) {
      //no invotor found in the system
      return res
        .status(404)
        .json({
          statusCode: 404,
          message:
            "Not be able to find the this invitor's partner in the system.",
        });
    }

    if (!opp1 || !opp1.length || !opp2 || !opp2.length) {
      //no invotor found in the system
      return res
        .status(404)
        .json({
          statusCode: 404,
          message: "Not be able to find the opponents in the system.",
        });
    }

    let phoneNumber = req.body.phoneNumber;
    let gamingDate = req.body.gamingDate;
    let gameStartTime = req.body.gameStartTime;
    let gameEndTime = req.body.gameEndTime;
    let address = req.body.address;
    let zipCode = req.body.zipCode;
    let notes = req.body.notes;

    let createInvitation = await new Invitation({
      invitorEmail: invitorEmail,
      inviteeEmail: [
        { partner: invitorPartnerEmail },
        { opponent: [inviteePlayer1Email, inviteePlayer2Email] },
      ],
      phoneNumber: phoneNumber,
      gamingDate: gamingDate,
      gameStartTime: gameStartTime,
      gameEndTime: gameEndTime,
      address: address,
      zipCode: zipCode,
      note: notes,
    });
    await createInvitation.save().then(
      (response) => {
        console.log("Successfully create invitation. ", response);
        let invitationPlayers = {
          invitor: invitorEmail,
          partner: invitorPartnerEmail,
          opponentPlayer1: inviteePlayer1Email,
          opponentPlayer2: inviteePlayer2Email,
        };
        return res.status(200).json({
          statusCode: 200,
          message:
            "Invitation Created for Double players, " +
            userInvitor[0].name +
            " and " +
            userInvitorPartner[0].name,
          body: invitationPlayers,
        });
      },
      (error) => {
        console.error("Promise rejected with error:", error.message);
        return res
          .status(404)
          .json({
            statusCode: 404,
            message: "Failed to invite gamers. " + error.message,
          });
      }
    );
  })
);

//api to get gaming invitation alerts
router.get(
  "/getNotification/:myEmail",
  asyncHandler(async (req, res) => {
    let { myEmail } = req.params;
    console.log("User is, ", myEmail);
    if (!myEmail) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Please provide an valid email." });
    }
    // validate a valid invitor user
    let myself = await User.find({ email: myEmail });
    if (!myself || !myself.length) {
      //no invotor found in the system
      return res
        .status(404)
        .json({
          statusCode: 404,
          message: "Not be able to find the user in the system.",
        });
    }

    //validate a valid invitation record
    let notificationList = [];

    let invitationRecordAsPartner = await Invitation.find({
      "inviteeEmail.partner": myEmail,
    });
    let invitationRecordAsOpponent = await Invitation.find({
      "inviteeEmail.opponent": myEmail,
    });
    console.log("as partner, ", invitationRecordAsPartner);
    console.log("as opponent, ", invitationRecordAsOpponent);
    // Get today's date
    let today = new Date();

    if (!isEmpty(invitationRecordAsPartner)) {
      invitationRecordAsPartner.forEach((partner) => {
        let targetDate = partner.gamingDate;
        if(targetDate >= today){
          let notificationObj = {
            invitor: partner.invitorEmail,
            phoneNumber:partner.phoneNumber,
            gamingDate:partner.gamingDate,
            gameStartTime:partner.gameStartTime,
            message: "You received a gaming invitation as the invitor's partner.",
          };
          notificationList.push(notificationObj);
        }
        
      });
    }

    if (!isEmpty(invitationRecordAsOpponent)) {
      invitationRecordAsOpponent.forEach((partner) => {
        let targetDate = partner.gamingDate;
        if(targetDate >= today){
        let notificationObj = {
          invitor: partner.invitorEmail,
          phoneNumber:partner.phoneNumber,
          gamingDate:partner.gamingDate,
          gameStartTime:partner.gameStartTime,
          message:
            "You received a gaming invitation as the invitor's opponent.",
        };
        notificationList.push(notificationObj);
      }
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Invitation notifications.",
      body: notificationList,
    });
  })
);

module.exports = router;
