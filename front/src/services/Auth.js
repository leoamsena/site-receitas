import { default as axios } from "./Axios";

export const login = async(email, password) => {
    const { data } = await axios.post("users/login", {
        email: email,
        password: password,
    });

    localStorage.setItem("jwt", data.token);

    localStorage.setItem("email", email);
    return true;
};
export const register = async(nome, email, password) => {
    const { data } = await axios.post("users/register", {
        nome,
        email,
        password,
    });
    localStorage.setItem("jwt", data.token);

    localStorage.setItem("email", email);
    return true;
};