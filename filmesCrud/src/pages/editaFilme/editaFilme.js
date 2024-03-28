import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput , TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

const db = new DatabaseConnection.getConnection



export default function EditaFilme() {
  const navigation = useNavigation();
  const route = useRoute();

  const [nomeFilme,setNomeFilme] = useState(route.params?.nomeDoFilme);
  const [genero,setGenero] = useState(route.params?.generoDoFilme);
  const [classificacao,setClassificacao] = useState(route.params?.classificacaoDoFilme);

  const enviaUpdate = () => {
    db.transaction(tx => {
      tx.executeSql('UPDATE filmes SET nome_filme=?, genero=?, classificacao =? WHERE id=?',
      [nomeFilme,genero,classificacao,route.params?.idDoFilme],
      (_,all) => {
        console.log(all)
        console.log('alterado dados com sucesso')
        
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
                    <Text style={styles.title}>Edite os dados de seu filme:</Text>
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
                    enviaUpdate();
                    navigation.navigate('todosFilmes',{refresh:true})
                }}
                style={[styles.alignVH, {display:'flex',justifyContent:'center', alignItems:'center' ,width: '80%', height: 40, borderColor: 'black', backgroundColor: 'green', borderRadius: 4 }]}>
                <Text style={{ color: 'white' }}>Salvar Modificações</Text>
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

