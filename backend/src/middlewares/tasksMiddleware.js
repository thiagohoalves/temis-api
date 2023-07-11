const validateFieldName = (request, response, next) => {
    const { body } = request;

    if (body.name == undefined) {
        return response.status(400).json({ message: 'The field "name" is required'});
    }

    if (body.name == '') {
        return response.status(400).json({ message: 'name cannot be empty'});
    }

    next();
};

const validateFieldEmail = (request, response, next) => {
    const { body } = request;

    if (body.email == undefined) {
        return response.status(400).json({ message: 'The field "email" is required'});
    }

    if (body.email == '') {
        return response.status(400).json({ message: 'email cannot be empty'});
    }

    next();
};

const validateFieldStatus = (request, response, next) => {
    const { body } = request;

    if (body.status == undefined) {
        return response.status(400).json({ message: 'The field "status" is required'});
    }

    if (body.status == '') {
        return response.status(400).json({ message: 'status cannot be empty'});
    }

    next();
};

module.exports = {
    validateFieldName,
    validateFieldEmail,
    validateFieldStatus
};