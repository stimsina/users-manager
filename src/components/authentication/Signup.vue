<template>
    <div class="signup container">
        <form  class="card-panel" @submit.prevent="signupUser">
            <h2 class="center">Signup</h2>
            <div class="field">
                <label for="email">Email :</label>
                <input type="email" name="email" id="email" v-model="email">


                <label for="userName">User Name :</label>
                <input type="text" name="userName" id="userName" v-model="userName">

                <label for="password">Password :</label>
                <input type="password" name="password" id="password" v-model="password">
            </div>
            <p class="red-text center" v-if="validationMessage">{{validationMessage}}</p>
            <div class="field center">
                <button class="btn">Signup</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import fireBaseDb from '@/firebase/init'
import firebase from 'firebase'

export default {
    name:'Signup',
    data(){
        return{
            email:null,
            password:null,
            userName:null,
            validationMessage:null,
            slug:null
        }
    },
    methods:{
        signupUser(){
            if(this.email&&this.password&&this.userName){
                this.slug=slugify(this.userName,{
                    replacement:'-',
                    remove:/[$*_+~,()*'"|\-:@]/,
                    lower:true
                })
                let ref=fireBaseDb.collection('users').doc(this.slug)

                firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(cred=>{
                    ref.set({
                        userName:this.userName,
                        geolocation:null,
                        userID:cred.user.uid
                    })
                }).then(()=>{
                    this.$router.push({name:'UMaps'})
                })
                .catch(err=>{
                    console.log(err)
                    this.validationMessage=err.message
                })


            }
            else{
                this.validationMessage='Please fill in all the fields .'
            }
        }
    }

}
</script>

<style scoped>
    .signup{
        max-width: 400px;
        margin-top:60px 
    }

    .signup h2{
        font-size: 2.4em;
    }

    .signup .field{
        margin-bottom: 16px;
    }

</style>
