const Crypto = require("../models/Crypto");

const getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.status(200).json(cryptos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 });
    res.status(200).json(gainers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 });
    res.status(200).json(newListings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    if (!name || !symbol || !price || !image || change24h === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const crypto = await Crypto.create({ name, symbol, price, image, change24h });
    res.status(201).json({ message: "Cryptocurrency added successfully", crypto });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllCrypto, getTopGainers, getNewListings, addCrypto };
