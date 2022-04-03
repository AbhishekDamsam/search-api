const searchRoute = require('./search-module/route');

// Route modules must be register here to use in server
const RouteModules = [
    SearchRouteModule = searchRoute
]

async function initializeRouteModules(app){
    const promises = RouteModules.map((module) => module(app));
    await Promise.all(promises);
}

module.exports = initializeRouteModules;