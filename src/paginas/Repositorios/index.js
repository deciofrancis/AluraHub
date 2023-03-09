import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import estilos from './estilos';
import { pegarRepositoriosDoUsuario } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';


export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const estaNaTela = useIsFocused();
    const [nomeRepo, setNomeRepo] = useState('');

    const pegandoRepositorio = async () => { 
        const resultado = await pegarRepositoriosDoUsuario(route.params.id) 
        setRepo(resultado) 
    }

    useEffect(() => {
        pegandoRepositorio()
    },[estaNaTela])

    async function buscarRepositorioPorNome() {
        const resultado = await PegarRepositoriosDoUsuarioPeloNome(route.params.id, nomeRepo);
        setRepo(resultado);
        setNomeRepo('');
    }

    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio')}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

                <FlatList
                    data={repo}
                    style={{ width: '100%' }}
                    keyExtractor={repo => repo.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={estilos.repositorio}
                            onPress={() => navigation.navigate('InfoRepositorio', {item})}
                        >
                            <Text style={estilos.repositorioNome}>{item.name}</Text>
                            <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                        </TouchableOpacity>
                    )}
                />

                <TextInput
                    value={nomeRepo}
                    onChangeText={setNomeRepo}
                    placeholder="Busque por um usuário"
                    autoCapitalize="none"
                    style={estilos.entrada}
                />
                <TouchableOpacity 
                    onPress={buscarRepositorioPorNome}
                >
                    <Text>Buscar</Text>
                </TouchableOpacity>
        </View>
    );
}