import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

const db = new DatabaseConnection.getConnection

export default function Home() {
  const navigation = useNavigation();

//   const deleteDatabase = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", //seleciona o nome de todas tabelas que temos no sqlite, exceto tabelas que começam com sqlite_,
//         [],
//         (_,{rows}) => {
//           rows._array.forEach((el) => {
//             tx.executeSql(`Drop table if exists ${el.name}`,
//             [],
//             ()=> {
//               console.log('tabela ${el.name} excluida com sucesso')
              
//             },
//             (_,error) => {
//               console.error(error)
//             }
//             )
//           })
//         }
//       )
//     })
//   }

// deleteDatabase()

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome_filme TEXT, genero TEXT, classificacao TEXT, data TEXT)',
        [],
        (_, all) => {
          console.log("entrou3")
          console.log('tabela filmes criada com sucesso')
        },
        (_, error) => {
          console.log("entrou4")
          console.error(error)
        }
      )
    })
  }, [])


  

  const limpaTable = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM filmes;',
      [],
      (_,{rows}) => {
        console.log(rows)
        // setDataReceive(all)
      },
      (_,error)=>{
        console.error(error)
      });
    })
  }



  // useEffect(() => {
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM sqlite_master WHERE type="table";',
  //     [],
  //     (_,{rows}) => {
  //       console.log(rows)
  //       // setDataReceive(all)
  //     },
  //     (_,error)=>{
  //       console.error(error)
  //     });
  //   })
  // }, [])



  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM filmes',
      [],
      (_,{rows}) => {
        console.log(rows)
        // setDataReceive(all)
      }, 
      (_,error)=>{
        console.error(error)
      });
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'flex-end', paddingBottom: 25 }}>
    
        <Text>Seja bem vindo ao MovieLegacy</Text>
      </View>
      {/*container buttons navigators */}
      <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
        <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('cadastrarFilme')}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Cadastre seu filme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('todosFilmes')}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Filmes cadastrados</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    minHeight: '100%',
  },
  buttons: {
    width: '40%',
    backgroundColor: 'dodgerblue',
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});