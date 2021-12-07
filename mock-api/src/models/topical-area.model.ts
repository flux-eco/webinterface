import { Schema, model} from "mongoose";

export interface TopicalArea {
    _id: string;
    'topical-area_name': string;
    'topical-area_image': string[];
    'topical-area_color': string;
    'topical-area_description': string;
    'topical-area_published': boolean;
    seq: number;
}

const topicalAreaSchema = new Schema<TopicalArea>({
    _id: {
        type: String,
    },
    'topical-area_name': {
        type: String,
        required: true,
        unique: true
    },
    'topical-area_image': [String],
    'topical-area_color': {
        type: String,
        default: 'blue'
    },
    'topical-area_description': {
        type: String,
    },
    'topical-area_published': {
        type: Boolean,
        default: false
    },
    seq: {
        type: Number,
        default: 1
    }
}, { _id: false });

const topicalAreaModel = model<TopicalArea>('TopicalArea', topicalAreaSchema);

export default topicalAreaModel