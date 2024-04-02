import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput , TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';
import { useState } from 'react';

const db = new DatabaseConnection.getConnection

export default function CadastrarFilme() {
  const navigation = useNavigation();

  const [nomeFilme,setNomeFilme] = useState('');
  const [genero,setGenero] = useState('');
  const [classificacao,setClassificacao] = useState('');

  const criaFilme = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO filmes (nome_filme,genero,classificacao,data) VALUES (?,?,?,date("now")) ',
      [nomeFilme,genero,classificacao],
      (_,all) => {
        console.log(all)
        // setDataReceive(all)
      },
      (_,error)=>{
        console.error(error)
      });
    })
    
  }


  return (
    <View style={styles.container}>

            <View style={{ width: '80%', display:"flex",alignItems:'center', gap:5 }}>
                <View style={styles.cardTitle}>
                    <Text style={styles.title}>Registre seu filme preferido:</Text>
                </View>

                <Text>Nome do Filme:</Text>
                <TextInput  value={nomeFilme} onChangeText={setNomeFilme} style={[styles.inputText, { width: '100%', borderColor:'black',borderWidth:2 }]} ></TextInput>

                <Text>Genero:</Text>
                <TextInput  value={genero} onChangeText={setGenero} style={[styles.inputText, { width: '100%', borderColor:'black',borderWidth:2 }]}  ></TextInput>

                <Text>Classificação:</Text>
                <TextInput  value={classificacao} onChangeText={setClassificacao} style={[styles.inputText, { width: '100%', borderColor:'black',borderWidth:2 }]}  ></TextInput>

            </View>

            <TouchableOpacity
                onPress={() => {
                    criaFilme();
                    navigation.navigate('home')
                }}
                style={[styles.alignVH, {display:'flex',justifyContent:'center', alignItems:'center' ,width: '80%', height: 40, borderColor: 'black', backgroundColor: 'blue', borderRadius: 4 }]}>
                <Text style={{ color: 'white' }}>Salvar</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap:5
  },
});




/////////////////////////////////////

