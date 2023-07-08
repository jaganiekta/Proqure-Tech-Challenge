var campaigns = require("../mock_db/campaigns.json");

function getAllCampaigns() {
  // fake delay to simulate db access
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(campaigns);
    }, 100)
  );
}

async function getCampaignById(id) {
  const allTags = await getAllCampaigns();
  return allTags.find((x) => x.campaign_id === id);
}

module.exports = {
  getAllCampaigns,
  getCampaignById,
};
