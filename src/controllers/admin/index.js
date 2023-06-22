import { Token, Message } from "../../models/index.js";
import SponseredToken from "../../models/sponserToken/index.js";
import { ETH_PLORER } from "../../utils/axios.js";
import Moment from "moment";
import MomentRange from "moment-range";
import { NOMICS_TABLE2 } from "../../services/nomics.js";
import Language from "../../models/addLanguage/index.js"

const moment = MomentRange.extendMoment(Moment);

export const postAddress = async (req, res, next) => {
  const { address } = req.body;
  try {
    if (await Token.findOne({ address }))
      return res.status(200).json({ message: "Address Already Exists" });
    if (address.length !== 42)
      return res
        .status(200)
        .json({ message: "Address Length must be equal to 42" });
    const { data } = await ETH_PLORER.get(
      `/service/service.php?search=${address}`
    );
    if (data.results.length === 0)
      return res.status(200).json({ message: "Invalid Address" });
    const createToken = await new Token({
      address,
      symbol: data.results[0][1],
    }).save();
    return res
      .status(200)
      .json({ data: createToken, message: "Address created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const getAddress = async (req, res, next) => {
  try {
    return res.status(200).json(await Token.find({}, { _id: 0, address: 1 }));
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const getSponserToken = async (req, res, next) => {
  try {
    return res.status(200).json(await SponseredToken.find({}));
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const addSponserToken = async (req, res) => {
  const { address } = req.body;
  try {
    if (await SponseredToken.findOne({ address }))
      return res.status(200).json({ message: "Address Already Exists" });
    if (address.length !== 42)
      return res
        .status(200)
        .json({ message: "Address Length must be equal to 42" });
    const { data } = await ETH_PLORER.get(
      `/service/service.php?search=${address}`
    );
    if (data.results.length === 0)
      return res.status(200).json({ message: "Invalid Address" });
    const createSponser = await new SponseredToken({
      address,
      name: data.results[0][0],
      symbol: data.results[0][1],
    }).save();
    return res
      .status(200)
      .json({ data: createSponser, message: "Address created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { date, toDate, message } = req.body;
    let gmtStarts = new Date(date);
    let gmtEnds = new Date(toDate);

    let gmtStart = moment(gmtStarts).format("MMM Do YY");
    let gmtEnd = moment(gmtEnds).format("MMM Do YY");
    const allBooking = await Message.find({});
    const clashedBookingsArray = [];
    for (const booking of allBooking) {
      if (
        gmtStart <= moment(booking.toDate).format("MMM Do YY") &&
        gmtStart >= moment(booking.date).format("MMM Do YY")
      ) {
        clashedBookingsArray.push(booking);
      } else if (
        gmtEnd <= moment(booking.toDate).format("MMM Do YY") &&
        gmtEnd >= moment(booking.date).format("MMM Do YY")
      ) {
        clashedBookingsArray.push(booking);
      }
    }
    if (clashedBookingsArray.length > 0) {
      return res.status(200).json({
        message: `Already Booking`,
      });
    }
    let bookingCreate = new Message({
      date: gmtStarts,
      toDate: gmtEnds,
      message: message,
      role: req.body.role,
    });
    const result = bookingCreate.save();
    res.status(200).json({
      message: "booking created",
      data: bookingCreate,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ message: error.message }] });
  }
};

export const getMessageWithDate = async (req, res) => {
  try {
    let CurrentDate = moment().format();
    let futureDate = moment().add(1, "days");
    let gmtStart = new Date(CurrentDate);
    let gmtEnd = new Date(futureDate);

    const allBooking = await Message.find({});
    const clashedBookingsArray = [];

    for (const booking of allBooking) {
      if (gmtStart <= booking.toDate && gmtStart >= booking.date) {
        clashedBookingsArray.push(booking);
      } else if (gmtEnd <= booking.toDate && gmtEnd >= booking.date) {
        clashedBookingsArray.push(booking);
      }
    }
    if (clashedBookingsArray.length > 0) {
      return res.status(202).json({
        message: `get Booking`,
        data: clashedBookingsArray,
      });
    } else {
      return res.status(400).json({
        message: `something wrong`,
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ message: error.message }] });
  }
};

// export const getTokensList = async (req, res, next) => {
//   try {
//     const tokens = await Token.find({}, { _id: 0, symbol: 1, address: 1 });
//     const coinListing = [];
//     let arr = [];
//     for (const [key, value] of Object.entries(tokens)) {
//       coinListing.push(await NOMICS_TABLE(value));
//     }

//     var c = coinListing?.filter((val) => {
//       console.log(val, "vla");

//       const filter = tokens.find((aVal) => {
//         if (aVal.symbol == val.symbol) {
//           return arr.push({ name: val.name, address: aVal.address });
//         }
//       });
//     });

//     return res.status(200).json(arr.sort((a, b) => a.id - b.id));
//   } catch (error) {
//     return res.status(500).json({ error: error?.message });
//   }
// };

export const getAllMessage = async (req, res) => {
  try {
    const result = await Message.find();
    if (!result) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Data get successfully",
        status: 200,
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getTokensList = async (req, res, next) => {
  try {
    const tokens = await Token.find({}, { _id: 0, symbol: 1, address: 1 });
    const coinListing = [];

    for (const [key, value] of Object.entries(tokens)) {
      coinListing.push(await NOMICS_TABLE2(value));
    }

    return res.status(200).json(coinListing.sort((a, b) => a.id - b.id));
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const uploadLanguage = async (req, res) => {
  try {
    var obj = req.body.result;
    const obj1 = JSON.parse(obj);
    const addLanguage = await Language.create(obj1);
    if (addLanguage) {
      return res.status(200).json({
        data: addLanguage,
        message: " New Language Added ",
      });
    } else {
      return res.status(400).json({
        message: "Bad Response",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};