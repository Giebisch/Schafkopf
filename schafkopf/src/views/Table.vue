<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ db["tables"][$route.params.id]?.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">    
      <div id="container">
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Zwischenstand</ion-card-subtitle>
            <ion-card-title>{{ runden_length }} Runden gespielt</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item  v-if="res.player1 >= 0"><ion-label color="success">{{player1}}</ion-label> <ion-label color="success">{{ res.player1 }}€</ion-label></ion-item>
            <ion-item v-else><ion-label color="danger">{{player1}}</ion-label> <ion-label color="danger">{{ res.player1 }}€</ion-label></ion-item>
            <ion-item  v-if="res.player2 >= 0"><ion-label color="success">{{player2}}</ion-label> <ion-label color="success">{{ res.player2 }}€</ion-label></ion-item>
            <ion-item v-else><ion-label color="danger">{{player2}}</ion-label> <ion-label color="danger">{{ res.player2 }}€</ion-label></ion-item>
            <ion-item  v-if="res.player3 >= 0"><ion-label color="success">{{player3}}</ion-label> <ion-label color="success">{{ res.player3 }}€</ion-label></ion-item>
            <ion-item v-else><ion-label color="danger">{{player3}}</ion-label> <ion-label color="danger">{{ res.player3 }}€</ion-label></ion-item>
            <ion-item  v-if="res.player4 >= 0"><ion-label color="success">{{player4}}</ion-label> <ion-label color="success">{{ res.player4 }}€</ion-label></ion-item>
            <ion-item v-else><ion-label color="danger">{{player4}}</ion-label> <ion-label color="danger">{{ res.player4 }}€</ion-label></ion-item>
          </ion-card-content>
        </ion-card>

        <ion-list v-for="(round, index) in runden" :key="index">
          <ion-card-subtitle>{{index + 1}}. {{ round.spielart }}: {{ round.betrag }}€</ion-card-subtitle>
          <ion-item><ion-label>{{player1}}</ion-label><ion-label>{{ round.player1 }}</ion-label></ion-item>
          <ion-item><ion-label>{{player2}}</ion-label><ion-label>{{ round.player2 }}</ion-label></ion-item>
          <ion-item><ion-label>{{player3}}</ion-label><ion-label>{{ round.player3 }}</ion-label></ion-item>
          <ion-item><ion-label>{{player4}}</ion-label><ion-label>{{ round.player4 }}</ion-label></ion-item>
        </ion-list>
      </div>
    </ion-content>
    <ion-fab :router-link="routerLink" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button id="fabButtonAddRound">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, 
         IonFab, IonFabButton, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonCheckbox, IonSelect, IonSelectOption,
         IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
         IonRange, IonButton, IonItem, IonList } from '@ionic/vue';
import { add } from 'ionicons/icons'
import { Storage } from '@ionic/storage'

export default defineComponent({
  name: 'TableComponent',
  data: () => ({
    routerLink: "",
    db: {"tables": []},
    id: 0,
    runden_length: 0,
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    res: {},
    betrag: 0,
    runden: [],
  }),
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    IonPage,
    IonTitle,
    IonMenuButton,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle,
    IonLabel,
    IonList,
    // IonSegment, 
    // IonSegmentButton,
    // IonCheckbox,
    // IonSelect,
    // IonSelectOption,
    // IonRange,
    // IonButton,
    IonItem,
    // IonList,
  },
  setup(){
    return {
      add
    }
  },
  async mounted() {
    this.initStorage().then(() =>
      this.calcErgebnisse()
    )
  },
  ionViewDidEnter() {
    this.initStorage().then(() =>
      this.calcErgebnisse()
    )
  },
  methods: {
    async initStorage(){
      let storage = new Storage()
      await storage.create()
      let db = await storage.get('db')
      this.db["tables"] = db["tables"]
      this.runden_length = db["tables"][Number(this.$route.params.id)]["runden"].length
      this.id = Number(this.$route.params.id)
      this.routerLink = "/table/" + this.$route.params.id + "/newRound"
      this.player1 = db["tables"][this.id].player1
      this.player2 = db["tables"][this.id].player2
      this.player3 = db["tables"][this.id].player3
      this.player4 = db["tables"][this.id].player4
      this.betrag = db["tables"][this.id].betrag
      this.runden = db["tables"][this.id].runden
    },
    calcErgebnisse(){
      let res = {
        "player1": 0,
        "player2": 0,
        "player3": 0,
        "player4": 0
      }
      let players = ["player1", "player2", "player3", "player4"]
      for(let runde in this.db["tables"][this.id]["runden"]){
        for(let player in players){
          let round : any = this.db["tables"][this.id]["runden"][runde]
          let winners = [round.player1, round.player2, round.player3, round.player4].filter(e => e === "gewonnen").length
          if (winners === 2){
            winners = 1
          } else {
            winners = 3
          }
          let erg = this.db["tables"][this.id]["runden"][runde][players[player]]
          let bet = this.db["tables"][this.id]["runden"][runde]["betrag"]
          if(erg === "gewonnen"){
            switch(player){
              case "0":
                res["player1"] += bet * winners
                break;
              case "1":
                res["player2"] += bet * winners
                break;
              case "2":
                res["player3"] += bet * winners
                break;
              case "3":
                res["player4"] += bet * winners
                break;
            }
          } else {
            switch(player){
              case "0":
                res["player1"] -= bet
                break;
              case "1":
                res["player2"] -= bet
                break;
              case "2":
                res["player3"] -= bet
                break;
              case "3":
                res["player4"] -= bet
                break;
            }
          }
        }
      }
      this.res = res
    }
  },
});

</script>

<style scoped>
#laufendeRange {
  width: 60%;
}

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

#fabButtonAddRound {
  margin: 20px;
}

ion-list {
  margin-top: 15px;
  margin-bottom: 25px;
}

</style>
