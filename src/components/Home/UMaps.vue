<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
import firebase from 'firebase'
import firebaseDb from '@/firebase/init'
export default {
    name:'UMaps',
    data(){
        return{
            lat:-52,
            lng:151.09

        }
    },
    methods:{
        fetchMaps(){
            const map=new google.maps.Map(document.getElementById('map'),{
                center:{lat:this.lat,lng:this.lng},
                zoom:6,
                maxZoom:15,
                minZoom:3,
                streetViewControl:true
            })

            firebaseDb.collection('users').get().then(users=>{
                users.docs.forEach(doc=>{
                    let data=doc.data()
                    if(data.geolocation){
                        let marker=new google.maps.Marker({
                            position:{
                                lat:data.geolocation.lat,
                                lng:data.geolocation.lng
                            },
                            map
                        })
                        marker.addListener('click',()=>{
                            this.$router.push({name:'ViewProfile',params:{id:doc.id}})
                        })
                    }
                })
            })

        }
    },
    mounted(){

        let user=firebase.auth().currentUser
        if(navigator.geolocation&&user){
            navigator.geolocation.getCurrentPosition(position=>{
                this.lat=position.coords.latitude
                this.lng=position.coords.longitude

                firebaseDb.collection('users').where('userID','==',user.uid).get().then(snapshot=>{
                    snapshot.forEach((doc)=>{
                        firebaseDb.collection('users').doc(doc.id).update({
                            geolocation:{
                                lat:this.lat,
                                lng:this.lng
                            }
                        })
                    })
                }).then(()=>{
                    this.fetchMaps()
                })
            },(err)=>{
                console.log(err)
                this.fetchMaps()
            },{maximumAge:60000,timeout:3000})
        }
        else{
            this.fetchMaps()
        }
    }

}
</script>

<style scoped>
    .google-map{
        width: 100%;
        height: 100%;
        margin:0 auto;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>
