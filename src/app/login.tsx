import React, {useEffect, useState}  from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet,Text,TextInput,TouchableOpacity,
    Image,View
 } from "react-native";
 import { router } from "expo-router";
import { ThemedView } from "@/components/themed-view";
 export default function LoginScreen() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[hidePassword, setHidePassword] = useState(true);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            router.replace("/home");
        }
    };
    
    const validate = async () => {
        let isValid = true;

     setEmailError("");
     setPasswordError("");

     if (email === "") {
        setEmailError("Email is required");
        isValid = false;
     } else if (
        !email.includes("@") ||
        !email.includes(".") ||
        !email.includes(".com") 
     ){
        setEmailError("Please enter a valid email");
        isValid = false;
     }
      
     if (password === ""){
        setPasswordError("Password is required");
        isValid = false;
     }

     if (isValid) {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
      if (error) {
        alert(error.message); 
        return
      }
console.log("USER ID:", data.user.id);

const { data: sessionData } = await supabase.auth.getSession();

  console.log(
    "SESSION USER:",
     sessionData.session?.user?.id
     );
      const user = data.user;

      const {data: profile, error:profileError} = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

      if (profileError) {
        alert(profileError.message)
        return;
      }
      if(!profile) {
        const {error: insertError} = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            full_name: user.user_metadata.display_name || "",
            email: user.email,
            phone: "",
            avatar_url: null,
        });
        if (insertError) {
            alert(insertError.message);
            return;
        }
      }
         alert("Login Successful!");
         router.replace("/home");
     }
      

    };
     return(
        <ThemedView style={style.container}>
            <Image 
             source={require("../../assets/images/react-logo.png")}
             style={style.logo}
            />

         <Text style={style.title}>Welcome Back</Text>   
         <Text style={style.subtitle}>Login to continue</Text>
          <Text style={style.label}>Email</Text>

          <TextInput placeholder="Enter your email"
          placeholderTextColor="#999"
          style={style.input}
          value={email}
          onChangeText={setEmail}
          />

          {emailError ?(
            <Text style={style.error}>{emailError}</Text>
          ) : null}

          <Text style={style.label}>Password</Text>

          <TextInput placeholder="Enter your password"
           placeholderTextColor="#999"
           style={style.input}
           value={password}
           onChangeText={setPassword}
           secureTextEntry={hidePassword}
          />

          {passwordError ? (
            <Text style={style.error}>{passwordError}</Text>
          ) : null}


          <TouchableOpacity
           onPress={() => setHidePassword(!hidePassword)}>
           <Text style={{ color: "#1877F2", marginBottom: 20 }}>
             {hidePassword ? "Show Password" : "Hide Password"}
              </Text>
           </TouchableOpacity>

        <TouchableOpacity>
         <Text style={style.forgotPassword}>
        Forgot Password?
        </Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={style.button}
          onPress={validate}
          >
         <Text style={style.buttonText}>
        Log In
        </Text>
         </TouchableOpacity>
         <ThemedView style={style.footer}>
         <Text style={style.footerText}>
             Don't have an account?
         </Text>
         <TouchableOpacity onPress={() => router.push("/")}>
           <Text style={style.signupText}>
          Sign Up
         </Text>
       </TouchableOpacity>
          </ThemedView>  
        </ThemedView>
     );
 }
 const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        paddingHorizontal: 25,
    },
     logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },

    title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1C1E21",
    textAlign: "center",
  },
   label: {
    fontSize: 15,
    color: "#1C1E21",
    fontWeight: "600",
    marginBottom: 8,
  },
   
    input: {
    height: 55,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DADDE1",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    marginBottom: 18,
  },

  
  error: {
    color: "red",
    fontSize: 13,
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 4,
  },

    forgotPassword: {
    color: "#1877F2",
    fontSize: 15,
    alignSelf: "flex-end",
    marginBottom: 25,
    fontWeight: "600",
  },

     button: {
    height: 55,
    backgroundColor: "#1877F2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

     footer: {
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginTop:15,
    backgroundColor: "#FFFFFF",
  },

  footerText: {
    fontSize: 15,
    color: "#65676B",
  },

    signupText: {
    fontSize: 15,
    color: "#1877F2",
    fontWeight: "700",
  },
  subtitle: {
  fontSize: 16,
  color: "#65676B",
  textAlign: "center",
  marginBottom: 30,
},



 });