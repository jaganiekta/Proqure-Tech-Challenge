var qrCodes = require("../mock_db/qr_codes.json");

function getAllCodes() {
  // fake delay to simulate db access
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(qrCodes);
    }, 100)
  );
}

async function getCodeById(id) {
  const qrCodes = await getAllCodes();
  return qrCodes.find((x) => x._id === id);
}

module.exports = {
  getAllCodes,
  getCodeById,
};
