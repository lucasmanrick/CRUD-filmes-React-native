import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';
import { useRoute } from '@react-navigation/native';

const db = new DatabaseConnection.getConnection

export default function TodosFilmes() {
  const navigation = useNavigation();
  const route = useRoute();
  const [dataReceive, setDataReceive] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [refresh, setRefresh] = useState(route.params?.refresh ? route.params.refresh : false);
  

  const procuraFilme = () => {
    setDataReceive([])
    if (searchMovie !== '') {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM filmes WHERE nome_filme = ?',
          [searchMovie],
          (_, { rows }) => {
            console.log('dataReceive dados01:')
            setDataReceive(rows._array)
            console.log(dataReceive);
          },
          (_,error) => {
            console.log('dataReceive dados02:')
            console.log(dataReceive);
            console.error(error)
            console.log('erro???')
          }
        )
      })
    } else {
      console.log('insira um valor valido para pesquisa')
    }

  }

  const listaFilmes = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM filmes',
        [],
        (_, { rows }) => {
          console.log(rows)
          setDataReceive(rows._array)
        },
        (_, error) => {
          console.error(error)
        });
    })
  }



  useEffect(() => {
    listaFilmes()
  },[])


  const deletaFilme = (id, nomeFilme) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM filmes WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected = 1) {
            Alert.alert('Info', `O Filme: ${nomeFilme} foi deletado com sucesso`)
            listaFilmes()
            return
          }
          Alert.alert(`o filme inserido não foi identificado, por favor tente novamente`)

        },
        (_, error) => {
          Alert.alert('Info', `O Filme selecionado não pôde ser alterado por favor tente novamente`)
          console.error(error)
        }
      )
    })
  }

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', margin: 20, height: 50, borderColor: 'black', borderWidth: 1 }}>
        <TextInput style={{ width: "70%", height:'100%' ,borderColor:'black', borderWidth:1 }} value={searchMovie} onChangeText={setSearchMovie}></TextInput>
        <TouchableOpacity onPress={() => procuraFilme()} style={{backgroundColor:"dodgerblue", width:'100%',height:'100%', display:"flex",justifyContent:'center'}} ><Text style={{width:'100%', color:'white', display:'flex',alignItems:'center'}}>Procurar</Text></TouchableOpacity>
      </View>

      <ScrollView style={{ width: '95%' }}>
        {dataReceive.map((registro, index) => (
          <View key={registro.id} style={{ height: 200, display: 'flex' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: '30%', backgroundColor: 'dodgerblue' }}>
              <Text style={{ fontSize: 18 }}>{index + 1}</Text>
              <Text style={{ fontSize: 18 }}>nome:{registro.nome_filme}</Text>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70%' }}>
              <Text>Genero:{registro.genero}</Text>
              <Text>Classificação:{registro.classificacao}</Text>
              <Text>registro: {registro.data}</Text>
              <View style={{ display: 'flex',width:'100%' ,flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ fontSize: 15 }} onPress={() => navigation.navigate('editaFilme',{idDoFilme:registro.id,nomeDoFilme:registro.nome_filme,generoDoFilme:registro.genero,classificacaoDoFilme:registro.classificacao})} >Editar</Text>
                <Text style={{ fontSize: 15 }} onPress={() => deletaFilme(registro.id, registro.nome_filme)}>Deletar</Text>
              </View>
            </View>
          </View>
        ),
        )}

      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
  }
});