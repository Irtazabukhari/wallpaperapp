import React from 'react';
import { StyleSheet, Text, View , TextInput, Image} from 'react-native';
import logo from '../assets/search.png';
import { useRecoilState } from 'recoil';
import { inputtextwallpaper } from '../atoms/wallpapertextinput';

const NavBar = () => {
  const [searchvalue,setSearchValue] = useRecoilState(inputtextwallpaper);
  onChangeTextinput = (text) =>{
   // console.log(text);
   console.log(searchvalue);
   setSearchValue(text);
  }
  return (
    <View style={styles.container}>

      
      {/*<Text>NavBar</Text>*/}
      <View style={styles.searchcont}>
        <Image source={logo} style={styles.searchicon}/>
        <TextInput style={styles.searchinput} placeholder=' Search Anything' onChangeText={this.onChangeTextinput}/>
      </View>


    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    paddingVertical:10,
    //flex: 1,
    marginTop:10,
    width:"100%",
    //height:"100%",
    //backgroundColor: 'red',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  searchicon:{
    width:20,
    height:20
  },
  searchcont:{
    flexDirection:"row",
    display:"flex",
    alignItems:"center",
    backgroundColor:"white",
    elevation:10,
    padding:10,
    width:"80%",
    borderRadius:10,
  },
  searchinput:{
    width:"90%",
    fontSize:20,
    paddingLeft:10
  },
});

export default NavBar;
