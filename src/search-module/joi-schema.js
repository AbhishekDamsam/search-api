const Joi = require('joi');

const dateRegexPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const dateValidFormat = 'YYYY-MM-DD';

const searchSchema = Joi.object().keys({
    startDate: Joi.string().required().pattern(dateRegexPattern, dateValidFormat),
    endDate: Joi.string().required().pattern(dateRegexPattern, dateValidFormat),
    minCount: Joi.number().integer().required().greater(0),
    maxCount: Joi.number().integer().required().greater(0)
}).custom((obj, helpers) => {
    //Compare the validated startDate and endDate
    const { startDate, endDate } = obj;
    if (Date.parse(endDate) < Date.parse(startDate)) {
        helpers.state.path[0] = 'endDate';
        throw new Error('startDate is greater than endDate');
    }
    return obj;
});

module.exports = searchSchema;