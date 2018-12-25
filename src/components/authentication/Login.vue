<template>
<div class="login container">
    <form class="card-panel" @submit.prevent="loginUser">
        <h2 class="center green-text">Login</h2>
        <div class="field">
            <label for="email">Email :</label>
            <input type="email" name="email" id="email" v-model="email"> 
            <label for="password">Password :</label>
            <input type="password" name="password" id="password" v-model="password">
        </div>
        <p class="red-text center" v-if="validationMessage">{{validationMessage}}</p>
        <div class="field center">
            <button class="btn ">Login</button>
        </div>
    </form>
</div>
    
</template>

<script>
import firebase from 'firebase'
export default {
    name:'Login',
    data(){
        return{
            email:null,
            password:null,
            validationMessage:null
        }
    },
    methods:{
        loginUser(){
            if(this.email&&this.password){
                this.validationMessage=null
                firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(cred=>{
                    this.$router.push({name:'UMaps'})
                }).catch(err=>{
                    this.validationMessage=err.message
                })

            }
            else{
                this.validationMessage='Please enter email and password .'
            }
        }
    }
}
</script>

<style>
.login{
    max-width: 400px;
    margin-top: 60px;
}
.login h2{
    font-size: 2.4em;

}
.login .field{
    margin-bottom: 16px;
}

</style>
