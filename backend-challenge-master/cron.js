const campaignRepository = require("./repositories/campaign-repository");
const appsRepository = require("./repositories/apps-repository");

/**
 * An app is live if it's linked to a campaigns that is live,
 * OR
 * if it's linked to another live app (i.e. appears on the other app links).
 *
 * This function calculates for each app if it's live or not,
 * and sets the is_live property accordingly.
 *
 * if the is_live status calculated from this function is different than what is currently saved in the database, the new status needs to be saved in the db by using the repository function:
 * appsRepository.saveApp(app)
 *
 *
 * @param sites
 */
async function calculateIsLive() {
  const campaigns = await campaignRepository.getAllCampaigns();
  const apps = appsRepository.getAllApps();

  function isAppLive(app) {
    // Check if the app has a live campaign redirecting to it
    const liveCampaign = campaigns.find(
      (campaign) =>
        campaign.status === "running" && campaign.redirect_url === app.url
    );
    if (liveCampaign) {
      return true;
    }

    // Check if any other live app links to this app
    const linkedApps = apps.filter((a) => a.links.includes(app.url));
    for (const linkedApp of linkedApps) {
      if (isAppLive(linkedApp, campaigns)) {
        return true;
      }
    }

    return false;
  }

  // Test the function for each app
  for (let id = 0; id < apps.length; id++) {
    const app = apps[id];
    var isLive = isAppLive(app);
    app.is_live = isLive;
    appsRepository.saveApp(app);
  }
}

calculateIsLive();
