import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export  const newsSchema = new Schema({
    title: {type: String},
    description: {type: String},
    permanLink: {type: String},
    date: {type: String},
    newsSourceId: {type: String},
    userId: {type: String},
    categoryId: {type: String},
    src:{type:String}
});
export const newSchema = mongoose.model('news', newsSchema);
