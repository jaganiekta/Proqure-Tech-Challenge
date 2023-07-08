const express = require("express");
const qrCodeRepository = require("./repositories/qr-code-repository");
const campaignRollsRepository = require("./repositories/campaign-rolls-repository");
const campaignRepository = require("./repositories/campaign-repository");
const app = express();
const port = 4000;

app.get("/scan/:codeId", async (req, res) => {
  try {
    const codeId = req.params.codeId;
    console.log(codeId);
    // WRITE YOUR CODE HERE
    
    const qrCodes = await qrCodeRepository.getCodeById(codeId);
    const campaignId = await campaignRollsRepository.getCampaignIdByRollId(qrCodes.roll_id);
    const campaign = await campaignRepository.getCampaignById(campaignId);
    
    if (campaign.status == "stopped") {
      res.redirect(campaign.default_url);
    } else {
      res.redirect(campaign.redirect_url);
    }

  } catch (error) {
    console.log(error);
    res.json({ error: "CodeId is invalid" });
  }
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
