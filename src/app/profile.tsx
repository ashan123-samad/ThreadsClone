import React, {useEffect, useState} from "react";
import {Text,
     TextInput, 
     TouchableOpacity,
     StyleSheet,
     Alert,
    }
     from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";      
import { MaterialIcons } from "@expo/vector-icons";
import {ThemedView} from "@/components/themed-view";
import {supabase} from "@/lib/supabase";
import {router} from "expo-router";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem  from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";

export default function Profile(){

const [email,setEmail] = useState("");
const [name,setName] = useState("");
const [address, setAddress] = useState("");
const [phone,setPhone] = useState("");
const [avatar, setAvatar] = useState("");

const [password,setPassword] = useState("");



useEffect(()=>{
    checkAuth();
},[]);

const checkAuth = async()=>{

  const {data} = await supabase.auth.getSession();

  if(!data.session){
    router.replace("/login");
    return;
  }
  getProfile();
};




const getProfile = async()=>{

 const {data:{user}, error} = await supabase.auth.getUser();


 if(error || !user){
    alert("User not found");
    return;
 }

   const {data: profile, error:profileError} = await supabase
   .from("profiles")
   .select("*")
   .eq("id",user.id)
   .single();

   if(profileError){
    alert(profileError.message);
    return;
   }


   if(profile){
    setEmail(profile.email);
     setName(profile.full_name);
     setPhone(profile.phone);
     setAddress(profile.address ?? "");
     setAvatar(profile.avatar_url);
   }


};




const updateProfile = async()=>{

const {data:{user}, error:userError} = await supabase.auth.getUser();


if(userError || !user) {
    alert("User not found");
         return;
}

const {error} = await supabase
.from("profiles")
.update({
  full_name:name,
  phone: phone,
  address: address,
  avatar_url: avatar,
})
.eq("id",user.id);

if(error){
    console.log("UPDATE ERROR:", error);
    alert(error.message);
    return;
}
 


if(password !== ""){

 const{ error: passwordError } = await supabase.auth.updateUser({
   password:   password
 });
 if(passwordError){
    alert("Profile updated successfully");
 }
};


alert("Profile updated");

};




const logout = async()=>{

 await supabase.auth.signOut();

 router.replace("/login");

};

 const removeProfilePicture = async () => {
    const {data : {user}} = await supabase.auth.getUser();
    if(!user) return;
    await supabase
    .from("profiles")
    .update({
        avatar_url: null
    })
    .eq("id", user.id);

    setAvatar("");
    alert("profile picture removed");

 };


 const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted){
        alert("permission denied");
        return;
    }  

   const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    }); 

    if (result.canceled) return;
    const imageUri = result.assets[0].uri;
    console.log("Selected Image:", imageUri);
    await uploadImage(imageUri);
 };

    const uploadImage = async (uri : string) => {
        console.log("Uploading:", uri);
        const { data:userData,error } = await supabase.auth.getUser();
        if (error){
            alert(error.message);
            return;
        }
        const user = userData.user;

        if (!user) {
            alert("User not logged in");
            return;
        } 

    const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding:"base64",
    });    

    const filepath = `${user.id}/avatar.jpg`;

    const { error: updateError } = await supabase.storage
    .from("avatars")
    .upload(filepath, decode(base64),{
        contentType: "image/jpeg",
        upsert: true,
    });
    
    if(updateError){
        console.log(updateError)
        alert(updateError.message);
        return;
    }

    const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filepath);

    const imageUrl = urlData.publicUrl;

    const {error: profileError} = 
    await supabase
    .from("profiles")
    .update({
        avatar_url: imageUrl,
    })
    .eq("id", user.id);

   
    if(profileError){
   console.log(profileError);
   alert(profileError.message);
   return;
}
 setAvatar(imageUrl);

    alert("Profile picture updated");
    }
    
const showProfileMenu = () =>{
    Alert.alert(
        "profile picture",
        "choose an option",
        [
            {
                text: "View Profile Picture ",
                onPress: () => {
                    if (avatar) {
                        alert("Show full image");
                    }else {
                        alert ("No Profile picture");
                    }
                },
            },
            {
                text: "Upload Profile Picture",
                onPress: () => {
                    pickImage();
                },
            },
            {
                text:"Remove Profile Picture",
                onPress: () => {
                    removeProfilePicture();
                },
            },
            { 
                text: "Cancel",
                style:"cancel",
            },

        ]
    );
};


return(

<SafeAreaView
style={styles.container}

>
    <TouchableOpacity 
    onPress={showProfileMenu}
    style={styles.avatarContainer}
    >
  {avatar ? (
    <Image
      source={{ uri: avatar }}
      style={styles.avatar}
    />
  ) : (
    <MaterialIcons
      name="account-circle"
      size={120}
      color="#BDBDBD"
    />
  )}
</TouchableOpacity>



<Text style={styles.label}>
    Email
</Text>

<TextInput
value={email}
editable={false}
style={styles.input}
/>



<Text style={styles.label}>
    Name
</Text>

<TextInput
value={name}
onChangeText={setName}
style={styles.input}
placeholder="Enter your name"
/>

<Text style={styles.label}>Address</Text>

<TextInput
 value={address}
 onChangeText={setAddress}
 style={styles.input}
placeholder="Enter Your Address"
/>
<Text style={styles.label}>
    New Password
</Text>

<TextInput
value={password}
onChangeText={setPassword}
secureTextEntry
placeholder="Enter new password"
style={styles.input}
/>



<TouchableOpacity
onPress={updateProfile}
style={styles.updateButton}
>

<Text style={styles.buttonText}>
Update Profile
</Text>

</TouchableOpacity>




<TouchableOpacity
onPress={logout}
style={styles.logoutButton}
>

<Text style={styles.buttonText}>
Logout
</Text>

</TouchableOpacity>


</SafeAreaView>

)

};

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F5F6FA",
        padding:25,
    },
    title:{
        fontSize:28,
        fontWeight: "700",
        color:"#1C1E21",
        textAlign:"center",
        marginTop:30,
        marginBottom:20,
    },
    avatarContainer:{
     alignItems:"center",
    },
    avatar:{
      width:130,
      height:130,
     borderRadius:65,
      },
      changePhoto:{
      textAlign:"center",
       color:"#1877F2",
      marginTop:10,
     marginBottom:25,
      fontSize:14,
    },

     card:{
    backgroundColor:"#FFFFFF",
     borderRadius:20,
    padding:20,

    shadowColor:"#000",
    shadowOffset:{
    width:0,
    height:4
    },
   shadowOpacity:0.1,
   shadowRadius:10,

   elevation:5,
   },

    label:{
  fontSize:14,
  fontWeight:"600",
  color:"#333",
  marginBottom:7,
},


input:{
  height:52,
  backgroundColor:"#F0F2F5",
  borderRadius:12,
  paddingHorizontal:15,
  fontSize:16,
  marginBottom:18,
  color:"#333",
},


updateButton:{
  height:55,
  backgroundColor:"#1877F2",
  borderRadius:12,
  justifyContent:"center",
  alignItems:"center",
  marginTop:10,
},


logoutButton:{
  height:55,
  backgroundColor:"#E53935",
  borderRadius:12,
  justifyContent:"center",
  alignItems:"center",
  marginTop:15,
},



buttonText:{
  color:"#FFFFFF",
  fontSize:17,
  fontWeight:"700",
},



});
