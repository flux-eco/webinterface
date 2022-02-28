import mongoose from 'mongoose'
import * as dotenv from 'dotenv';

import dbConfig from './src/configs/db.config'

import * as topicalAreaCtrl from './src/controller/topical-area/topical-area.controller';
import * as trainingSessionCtrl from './src/controller/training-session/training-session.controller';
import * as pageDefinitionCtrl from './src/controller/page-definition/page-definition.controller';
import * as port from './src/port/port'

topicalAreaCtrl;
trainingSessionCtrl;
pageDefinitionCtrl;
port;

dotenv.config({ path: __dirname+'/.env' });


mongoose
    .connect(dbConfig.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });