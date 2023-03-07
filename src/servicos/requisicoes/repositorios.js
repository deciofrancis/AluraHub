import api from "../api";

export async function pegarRepositoriosDoUsuario() {
    try {
        const resultado = await api.get(`/repos?post=${id}`);
        return resultado.data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}