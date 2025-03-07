import mongoose from "mongoose";

const { model, Schema } = mongoose


export const ScreenType = {
    VIP: 'vip',
    THREE_D: '3d',
    FOUR_D: '4d',
    IMAX: 'imax',
    standard: 'standard'
}

const screenSchema = new Schema(
    {
        cinema_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
        capacity: { type: Number },
        screenType: {
            type: String,
            enum: Object.values(ScreenType),
            required: true,
        }
    }
)

export const screenModel = model('Screen', screenSchema)