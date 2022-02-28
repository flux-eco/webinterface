import { Schema, model} from "mongoose";

export interface TrainingSession {
    _id: string;
    'training-session_areaId': string,
    'training-session_name': string;
    'training-session_image': string;
    'training-session_description': string;
    'training-session_published': boolean;
    seq: number;
}

const trainingSessionSchema = new Schema<TrainingSession>({
    _id: {
        type: String,
    },
    'training-session_areaId': {
        type: String,
        require: true
    },
    'training-session_name': {
        type: String,
        required: true,
    },
    'training-session_image': [String],
    'training-session_description': {
        type: String,
    },
    'training-session_published': {
        type: Boolean,
        default: false
    },
    seq: {
        type: Number,
        default: 1
    }
}, { _id: false });

const trainingSessionModel = model<TrainingSession>('TrainingSession', trainingSessionSchema);

export default trainingSessionModel