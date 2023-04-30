import { newSchema } from "../models/news.model.js"
export const getNew = async function (id) {//get all new by user id
    try {
        const news = await newSchema.find({ userId: id });
        if (news) {
            return news;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
export const getNewByCategory = async function (id_Categoria, user_id) {
    console.log(id_Categoria)
    console.log(user_id)
    try {
        const news = await newSchema.find({ userId: user_id, categoryId: id_Categoria });
        if (news) {
            return news;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
export const getMyNewSearch = async function ( user_id,valor) {
    console.log(valor);
    try {
        const news = await newSchema.find({
            userId: user_id,
            title: { $regex: valor, $options: "i" }
        });
        if (news) {
            return news;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}