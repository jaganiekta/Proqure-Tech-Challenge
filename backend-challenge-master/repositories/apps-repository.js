var apps = require("../mock_db/apps.json");

function getAllApps() {
  return apps;
}

function getAppById(id) {
  const allApps = getAllApps();
  return allApps.find((x) => x.id === id);
}

function saveApp(app) {
  console.log(`Saving app ${app.id}. is_live = ${app.is_live}`);
}

module.exports = {
  getAllApps,
  getAppById,
  saveApp,
};
