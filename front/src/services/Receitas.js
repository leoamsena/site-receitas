import { default as axios } from "./Axios";
import { default as config } from "../config/index.js";

export const update = async(id, form) => {
    const { data } = await axios.patch("receitas/" + id, form);
    return acertarUrlImagem([data])[0];
};

export const getRandom = async(number = 3) => {
    const { data } = await axios.get("receitas/random/" + number);
    return acertarUrlImagem(data);
};
export const submit = async(form) => {
    const { data } = await axios.post("receitas/", form);
    return acertarUrlImagem([data])[0];
};
export const getOne = async(id) => {
    const { data } = await axios.get("receitas/" + id);
    data.imagem = config.baseApi + data.imagem;
    return data;
};
export const avaliar = async(id, nota) => {
    await axios.post("receitas/avaliar/" + id, { nota });
    return true;
};

function acertarUrlImagem(array) {
    return array.map((item) => {
        const img = config.baseApi + item.imagem;
        item.imagem = img;
        return item;
    });
}
export const minhasReceitas = async() => {
    const { data } = await axios.get("users/receitas");
    return acertarUrlImagem(data);
};
export const apagar = async(id) => {
    const { data } = await axios.delete("receitas/" + id);
    return data;
};
export const getAll = async() => {
    const { data } = await axios.get("receitas");
    return acertarUrlImagem(data);
};