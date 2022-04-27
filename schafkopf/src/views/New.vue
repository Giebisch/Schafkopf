<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <ion-list lines="full">
          <ion-list-header>
            <ion-label>Tischname</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-input v-model="tischname" autocapitalize='on' placeholder="Tisch"></ion-input>
          </ion-item>
        </ion-list>

        <ion-list lines="full">
          <ion-list-header>
            <ion-label>Mitspieler</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-label>Spieler 1</ion-label>
            <ion-input v-model="player1" autocapitalize='on' placeholder="Name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Spieler 2</ion-label>
            <ion-input v-model="player2" autocapitalize='on' placeholder="Name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Spieler 3</ion-label>
            <ion-input v-model="player3" autocapitalize='on' placeholder="Name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Spieler 4</ion-label>
            <ion-input v-model="player4" autocapitalize='on' placeholder="Name"></ion-input>
          </ion-item>
        </ion-list>

        <ion-list lines="full">
          <ion-list-header>
            <ion-label>Einsatz</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-label>Rufspiel</ion-label>
            <ion-range v-model="rufspiel" min="10" max="50" step="5" snaps="true" value="20"></ion-range>
          </ion-item>
          <ion-item>
            <ion-label>Solo</ion-label>
            <ion-range v-model="solo" min="20" max="100" step="10" snaps="true" value="50"></ion-range>
          </ion-item>
          <ion-item>
            <ion-label>Laufende</ion-label>
            <ion-range v-model="laufende" min="10" max="30" step="5" snaps="true" value="10"></ion-range>
          </ion-item>
        </ion-list>
   
        <ion-button @click="onClickCreateTable()" expand="block">Erstelle Tisch</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonList, IonRange } from '@ionic/vue';
import { Storage } from '@ionic/storage'

export default defineComponent({
  name: 'EinstellungenComponent',
  data: () => ({
    tischname: "",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    rufspiel: 20,
    solo: 50,
    laufende: 10
  }),
  components: {
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonInput,
    IonList,
    IonRange,
  },
  ionViewDidEnter() {
    this.tischname = ""
    this.player1 = ""
    this.player2 = ""
    this.player3 = ""
    this.player4 = ""
    this.rufspiel = 20
    this.solo = 50
    this.laufende = 10
  },
  methods: {
    async onClickCreateTable(){
      if (this.tischname && this.player1 && this.player2 && this.player3 && this.player4){
        let storage = new Storage();
        await storage.create()
        let db = await storage.get('db')
        console.log(db)
        let now = new Date()
        let date = now.getDay() + "." + now.getMonth() + "." + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes()
        db['tables'].push(
          {
            "name": this.tischname,
            "date": date,
            "player1": this.player1,
            "player2": this.player2,
            "player3": this.player3,
            "player4": this.player4,
            "rufspiel": 20,
            "solo": 50,
            "laufende": 10
          }
        )
        await storage.set('db', db)
        this.$router.push('/Spiele')
      }
    }
  }
}
)

</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  /* top: 50%;
  transform: translateY(-50%); */
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
