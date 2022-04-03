const getDb = require('../db-connect').get;

const getDbCollection = function () {
    //Collection name is records
    return getDb().collection('records');
}

let SearchManager = {
    searchRecords: async function (query) {
        const Records = getDbCollection();
        const docs = await Records.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date(query.startDate).setHours(0, 0, 0)),
                        $lt: new Date(new Date(query.endDate).setHours(23, 59, 59))
                    }
                }
            },
            // multiple documents of same key
            { $project: { key: 1, createdAt: 1, totalCount: { $sum: "$counts" } } }, 
            { $group: { _id: { key: "$key", createdAt: "$createdAt" }, totalCount: { $sum: "$totalCount" } } },
            { $match: { totalCount: { $gte: query.minCount, $lte: query.maxCount } } },
            {
                $project: {
                    _id: 0,
                    key: "$_id.key", createdAt: "$_id.createdAt",
                    totalCount: "$totalCount"
                }
            },
            { $sort: { totalCount: 1 } } // If sorting is needed use it else remove this pipeline stage
        ]
        ).toArray();
        return docs;
    }
}

module.exports = SearchManager;