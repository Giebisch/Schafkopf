<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Tische</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header> -->
    
      <div id="container">
        <spiel-tile v-for="(table, index) in db.tables.reverse()" :key="index" :details="table" @click="routeToTable(index)"/>
      </div>
    </ion-content>

    <ion-fab router-link="/new" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons'
import SpielTile from './SpielTile.vue'
import { Storage } from '@ionic/storage'

export default defineComponent({
  name: 'SpieleComponent',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    SpielTile,
  },
  data: () => ({
    db: {"tables": []},
  }),
  setup() {
    return {
      add
    }
  },
  mounted() {
    this.initStorage()
  },
  ionViewDidEnter() {
    this.initStorage()
  },
  methods: {
    async initStorage(){
      let storage = new Storage()
      await storage.create()
      if (!(await storage.get("db"))){
        await storage.set("db", {
          "tables": [],
          "settings": {}
        })
      } else {
        this.db = await storage.get("db")
      }
    },
    async routeToTable(table : string){
      let storage = new Storage()
      await storage.create()
      let db = await storage.get("db")
      let index = db["tables"].length - Number(table) - 1
      this.$router.push('/table/' + index)
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
