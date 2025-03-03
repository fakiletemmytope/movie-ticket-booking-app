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
        cinema_id: {},
        capacity: {},
        screenType: {}
    }
)