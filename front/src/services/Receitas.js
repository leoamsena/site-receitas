import { default as axios } from "./Axios";
import { default as config } from "../config/index.js";
export const getRandom = async(number = 3) => {
    const { data } = await axios.get("receitas/random/" + number);
    return acertarUrlImagem(data);
};

function acertarUrlImagem(array) {
    return array.map((item) => {
        const img = config.baseApi + item.imagem;
        item.imagem = img;
        return item;
    });
}