const express = require('express');
const config = require('../config');
const router = express.Router();
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const ReplacementModel = require('../models/Replacement');

const JwtMiddleware = require('../middleware/JwtMiddleware');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const uuidv3 = require('uuid/v3');
const path = require('path');
const fs = require('fs');

router.post('/login', jsonParser, (req, res) => {
    const user = req.body;
    if( !user.email || !user.password ) {
        res.status(400).send('User not found!');
        return;
    }
    
    const userModel = new UserModel();
    userModel.login(user).then(data => {
        res.json(data);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/users', JwtMiddleware, (req, res) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, config.jwt_secret);

    const userModel = new UserModel();

    if( decoded.level.user_view ) {
        userModel.getUsers().then(data => {
            res.json(data);
        }, err => {
            res.status(400).send(err);
        });
    } else {
        userModel.getUser(decoded.id).then(data => {
            res.json([data]);
        }, err => {
            res.status(400).send(err);
        });
    }
});

router.put('/users', jsonParser, JwtMiddleware, (req, res) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, config.jwt_secret);
    const userModel = new UserModel();
    const userData = req.body;

    if( userData.id != decoded.id ) {
        if( !decoded.level.user_edit ) {
            res.status(400).send('Authorization fail.');
            return;
        }
    }
    userModel.updateUser(userData).then(data => {
        userModel.getUser( userData.id ).then(data => {
            res.json(data);
        }, err => {
            res.status(400).send(err);
        });
    }, err => {
        res.status(400).send(err);
    });
});

router.post('/users', jsonParser, JwtMiddleware, (req, res) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, config.jwt_secret);
    const userModel = new UserModel();
    const userData = req.body;

    if( !decoded.level.user_add ) {
        res.status(400).send('Authorization fail.');
        return;
    }

    userModel.createUser(userData).then(insertId => {
        userModel.getUser( insertId ).then(data => {
            res.json(data);
        }, err => {
            res.status(400).send(err);
        });
    }, err => {
        res.status(400).send(err);
    });
});

router.delete('/users/:id', jsonParser, JwtMiddleware, (req, res) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, config.jwt_secret);
    const userModel = new UserModel();
    const user_id = req.params.id;

    if( !decoded.level.user_add ) {
        res.status(400).send('Authorization fail.');
        return;
    }

    userModel.deleteUser(user_id).then(data => {
        res.json(data);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/levels', JwtMiddleware, (req, res) => {
    const userModel = new UserModel();

    userModel.getLevels().then(data => {
        res.json(data);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/parts', JwtMiddleware, (req, res) => {
    const replacementModel = new ReplacementModel();
    replacementModel.getParts().then(data => {
        res.json(data);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/replacements', JwtMiddleware, (req, res) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, config.jwt_secret);
    const params = req.query;

    if( !decoded.level.maintance_view ) {
        params.user_id = decoded.id;
    }

    const replacementModel = new ReplacementModel();
    replacementModel.getReplacements(params).then(data => {
        res.json(data);
    }, err => {
        res.status(400).send(err);
    });
});

router.post('/replacements', jsonParser, JwtMiddleware, (req, res) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, config.jwt_secret);
    const replacementModel = new ReplacementModel();
    const replacementData = req.body;
    
    if( !decoded.level.maintance_add ) {
        res.status(400).send('Authorization fail.');
        return;
    }

    replacementData.user_id = decoded.id;

    replacementModel.createReplacements( replacementData ).then(insertId => {
        replacementModel.getReplacement( insertId ).then(data => {
            res.json(data);
        }, err => {
            res.status(400).send(err);
        });
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/images/:user_id/:file_name', (req, res) => {
    let user_id = req.params.user_id;
    let file_name = req.params.file_name;
    let file_path = path.join(__dirname, '../images/' + user_id + '/' + file_name);
    if( !fs.existsSync(file_path) ) {
        return res.status(400).send('Files not found');
    }
    res.sendFile(file_path);
});

router.post('/images', JwtMiddleware, (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let image = req.files.image;
    let type = 'jpg';

    switch( image.mimetype ) {
        case 'image/jpeg':
            type = 'jpg';
            break;
        case 'image/png':
            type = 'png'
            break;
        default:
            return res.status(400).send('Unsupport Type.');
    }
    

    const token = req.headers.token;
    const decoded = jwt.verify(token, config.jwt_secret);

    let file_name = uuidv3(decoded.id + '' + new Date().toISOString(), uuidv3.DNS) + '.' + type;
    let file_path = path.join(__dirname, '../images/' + decoded.id + '/'); 

    if (!fs.existsSync(file_path)){
        fs.mkdirSync(file_path);
    }

    image.mv( file_path + file_name );

    res.json({
        path: '/api/images/' + decoded.id + '/' + file_name 
    });
});

module.exports = router;