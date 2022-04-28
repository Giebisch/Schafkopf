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
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ db["tables"][$route.params.id].name }}</ion-title>
        </ion-toolbar>
      </ion-header> -->
    
      <div id="container">
        <ion-list lines="full">
          <ion-item>
            <ion-label>Spiel</ion-label>
            <ion-select v-model="spielart" value="rufspiel" interface="popover" @ionChange="calcBetrag()">
              <ion-select-option value="rufspiel">Rufspiel</ion-select-option>
              <ion-select-option value="solo">Solo</ion-select-option>
              <ion-select-option value="wenz">Wenz</ion-select-option>
              <ion-select-option value="ramsch">Ramsch</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>{{ db["tables"][$route.params.id]?.player1 }}</ion-label>
            <ion-checkbox v-model="player1_g" @ionChange="calcBetrag()">Legen</ion-checkbox>
            <section>
            <ion-segment v-model="player1" value="none">
              <ion-segment-button value="gewonnen">Gewonnen</ion-segment-button>
              <ion-segment-button value="verloren">Verloren</ion-segment-button>
            </ion-segment>
            </section>
          </ion-item>
          <ion-item>
            <ion-label>{{ db["tables"][$route.params.id]?.player2 }}</ion-label>
            <ion-checkbox v-model="player2_g" @ionChange="calcBetrag()">Legen</ion-checkbox>
            <section>
            <ion-segment v-model="player2" value="none">
              <ion-segment-button value="gewonnen">Gewonnen</ion-segment-button>
              <ion-segment-button value="verloren">Verloren</ion-segment-button>
            </ion-segment>
            </section>
          </ion-item>
          <ion-item>
            <ion-label>{{ db["tables"][$route.params.id]?.player3 }}</ion-label>
            <ion-checkbox v-model="player3_g" @ionChange="calcBetrag()">Legen</ion-checkbox>
            <section>
            <ion-segment v-model="player3" value="none">
              <ion-segment-button value="gewonnen">Gewonnen</ion-segment-button>
              <ion-segment-button value="verloren">Verloren</ion-segment-button>
            </ion-segment>
            </section>
          </ion-item>
          <ion-item>
            <ion-label>{{ db["tables"][$route.params.id]?.player4 }}</ion-label>
            <ion-checkbox v-model="player4_g" @ionChange="calcBetrag()">Legen</ion-checkbox>
            <section>
            <ion-segment v-model="player4" value="none">
              <ion-segment-button value="gewonnen">Gewonnen</ion-segment-button>
              <ion-segment-button value="verloren">Verloren</ion-segment-button>
            </ion-segment>
            </section>
          </ion-item>
        </ion-list>
        <h2>{{ betrag }}€</h2>
        <ion-list lines="full">
          <ion-item>
            <ion-label>{{ this.laufende }} Laufende</ion-label>
            <div id="laufendeRange">
              <ion-range v-model="laufende" min="0" max="8" step="1" snaps="true" value="0" @ionChange="calcBetrag()"></ion-range>
            </div>
          </ion-item>
          <ion-item>
            <ion-label>Schneider</ion-label>
            <ion-checkbox v-model="schneider" @ionChange="calcBetrag()"></ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-label>Schwarz</ion-label>
            <ion-checkbox v-model="schwarz" @ionChange="calcBetrag()"></ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-label>Kontra</ion-label>
            <ion-checkbox v-model="kontra" @ionChange="calcBetrag()"></ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-label>Re</ion-label>
            <ion-checkbox v-model="re" @ionChange="calcBetrag()"></ion-checkbox>
          </ion-item>
        </ion-list>
        <ion-button expand="block" @click="addRound()">Spiel hinzufügen</ion-button>
      </div>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, 
         IonFab, IonFabButton, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonCheckbox, IonSelect, IonSelectOption,
         IonRange, IonButton, IonItem, IonList } from '@ionic/vue';
import { add } from 'ionicons/icons'
import { Storage } from '@ionic/storage'

export default defineComponent({
  name: 'NewRound',
  data: () => ({
    db: {"tables": []},
    betrag: 0,
    spielart: "rufspiel",
    laufende: 0,
    schneider: false,
    schwarz: false,
    kontra: false,
    re: false,
    player1_g: false,
    player2_g: false,
    player3_g: false,
    player4_g: false,
    player1: null,
    player2: null,
    player3: null,
    player4: null,
  }),
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    IonPage,
    IonTitle,
    IonMenuButton,
    IonLabel,
    IonSegment, 
    IonSegmentButton,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonRange,
    IonButton,
    IonItem,
    IonList,
  },
  async mounted() {
    this.initStorage()
  },
  ionViewDidEnter() {
    this.initStorage()
  },
  methods: {
    async initStorage(){
      let storage = new Storage()
      await storage.create()
      let db = await storage.get('db')
      this.db["tables"] = db["tables"]
      this.betrag = db["tables"][this.$route.params.id.toString()]?.rufspiel
    },
    calcBetrag() {
      console.log(this.schneider)
      let newBetrag = 0
      switch (this.spielart){
        case "rufspiel":
          newBetrag +=this.db["tables"][Number(this.$route.params.id)]["rufspiel"]
          break
        case "solo":
          newBetrag += this.db["tables"][Number(this.$route.params.id)]["solo"]
          break
        case "wenz":
          newBetrag +=this.db["tables"][Number(this.$route.params.id)]["solo"]
          break
        case "ramsch":
          newBetrag += this.db["tables"][Number(this.$route.params.id)]["rufspiel"]
          break
      }
      newBetrag += this.laufende * this.db["tables"][Number(this.$route.params.id)]["laufende"]

      let times = 1 + [this.schneider, this.schwarz, this.kontra, this.re, this.player1_g, this.player2_g,
      this.player3_g, this.player4_g].filter(Boolean).length
      newBetrag = newBetrag * times

      this.betrag = newBetrag
    },
    async addRound(){
      let round = {
        "spielart": this.spielart,
        "player1": this.player1,
        "player2": this.player2,
        "player3": this.player3,
        "player4": this.player4,
        "betrag": this.betrag,
        "laufende": this.laufende,
        "schneider": this.schneider,
        "kontra": this.kontra,
        "schwarz": this.schwarz,
        "re": this.re,
        "gelegt": [this.player1_g, this.player2_g, this.player3_g, this.player4_g].filter(Boolean).length,
      }
      let storage = new Storage()
      await storage.create()
      let db = await storage.get('db')
      db["tables"][this.$route.params.id.toString()]?.runden.push(round)
      await storage.set('db', db)
      this.$router.back()
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
</style>
