<template>
    <div class="view-profile container">
        <div class="card" v-if="profile">
            <h2 class="green-text center">Welcome to {{profile.userName}}'s profile .</h2>
        </div>
        
    </div>
</template>

<script>
import firebaseDb from '@/firebase/init'
export default {
    name:'view-profile',
    data(){
        return{
            profile:null,
        }
    },
    created(){
        let ref=firebaseDb.collection('users')
        ref.doc(this.$route.params.id).get().then(user=>{
            this.profile=user.data()
        })
    }

}
</script>

<style>

</style>
