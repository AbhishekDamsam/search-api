const ResponseError = require('../responseError');
const manager = require('./manager');

let SearchHandler = {
    searchRecords: async function (req, res, next) {
        try {
            const { startDate, endDate, minCount, maxCount } = req.body;
            let result = await manager.searchRecords({ startDate, endDate, minCount, maxCount });
            return res.status(200).json({
                code: 0,
                msg: 'Success',
                records: result
            });
        }
        catch (e) {
            e.message = 'Search using the request payload combination caused an error.'
            next(new ResponseError(500, e.message));
        }
    }
}

module.exports = SearchHandler;