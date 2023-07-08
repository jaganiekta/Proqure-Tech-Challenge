var campaignRolls = require("../mock_db/campaign_rolls.json");

function getAllCampaignRolls() {
  // fake delay to simulate db access
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(campaignRolls);
    }, 100)
  );
}

async function getRollsByCampaignId(campaignId) {
  const campaignRolls = await getAllCampaignRolls();
  return campaignRolls.find((x) => x.campaign_id === campaignId);
}

async function getCampaignIdByRollId(rollId) {
  const campaignRolls = await getAllCampaignRolls();
  const found = campaignRolls.find((x) => x.roll_id === rollId);
  if (found) {
    return found.campaign_id;
  } else {
    return null;
  }
}

module.exports = {
  getAllCampaignRolls,
  getRollsByCampaignId,
  getCampaignIdByRollId,
};
