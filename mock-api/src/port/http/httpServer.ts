import express from 'express';

import topicalAreaRouter from './routes/topical-area.route'
import trainingSessionRouter from './routes/training-session.route'
import pageDefinitionRouter from './routes/page-definition.route'

const app = express();
const port = process.env.PORT || 8010;

app.use(express.json());
app.use(express.static('public'))

app.use('/api/v1/topical-area', topicalAreaRouter)
app.use('/api/v1/training-session', trainingSessionRouter)
app.use('/api/v1/tablePageDefinition', pageDefinitionRouter)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})