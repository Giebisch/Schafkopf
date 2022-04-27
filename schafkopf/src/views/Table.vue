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
        <ion-list>
          
          <ion-item>
            <ion-label>{{ db["tables"][$route.params.id]?.player1 }}</ion-label>
            <ion-checkbox>Legen</ion-checkbox>
            <section>
            <ion-segment value="none">
              <ion-segment-button value="gewonnen">Gewonnen</ion-segment-button>
              <ion-segment-button value="verloren">Verloren</ion-segment-button>
            </ion-segment>
            </section>
          </ion-item>
          <ion-item>
            <ion-label>{{ db["tables"][$route.params.id]?.player2 }}</ion-label>
            <ion-checkbox>Legen</ion-checkbox>
            <section>
            <ion-segment value="none">
              <ion-segment-button value="gewonnen">Gewonnen</ion-segment-button>
              <ion-segment-button value="verloren">Verloren</ion-segment-button>
            </ion-segment>
            </section>
          </ion-item>
          <ion-item>
            <ion-label>{{ db["tables"][$route.params.id]?.player3 }}</ion-label>
            <ion-checkbox>Legen</ion-checkbox>
            <section>
            <ion-segment value="none">
              <ion-segment-button value="gewonnen">Gewonnen</ion-segment-button>
              <ion-segment-button value="verloren">Verloren</ion-segment-button>
            </ion-segment>
            </section>
          </ion-item>
          <ion-item>
            <ion-label>{{ db["tables"][$route.params.id]?.player4 }}</ion-label>
            <ion-checkbox>Legen</ion-checkbox>
            <section>
            <ion-segment value="none">
              <ion-segment-button value="gewonnen">Gewonnen</ion-segment-button>
              <ion-segment-button value="verloren">Verloren</ion-segment-button>
            </ion-segment>
            </section>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, 
         IonFab, IonFabButton, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonCheckbox } from '@ionic/vue';
import { add } from 'ionicons/icons'
import { Storage } from '@ionic/storage'

export default defineComponent({
  name: 'TableComponent',
  data: () => ({
    db: {"tables": []},
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
    // IonSegment, 
    // IonSegmentButton,
    IonCheckbox,
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
    }
  }
});

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
