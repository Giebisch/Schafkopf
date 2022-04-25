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
            <ion-label>Mitspieler</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-label>Spieler 1</ion-label>
            <ion-input autocapitalize='on' placeholder="Name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Spieler 2</ion-label>
            <ion-input autocapitalize='on' placeholder="Name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Spieler 3</ion-label>
            <ion-input autocapitalize='on' placeholder="Name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Spieler 4</ion-label>
            <ion-input autocapitalize='on' placeholder="Name"></ion-input>
          </ion-item>
        </ion-list>

        <ion-list lines="full">
          <ion-list-header>
            <ion-label>Einsatz</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-label>Rufspiel</ion-label>
            <ion-range ref="rufspiel" min="10" max="50" step="5" snaps="true" value="20"></ion-range>
          </ion-item>
          <ion-item>
            <ion-label>Solo</ion-label>
            <ion-range ref="solo" min="20" max="100" step="10" snaps="true" value="50"></ion-range>
          </ion-item>
          <ion-item>
            <ion-label>Laufende</ion-label>
            <ion-range ref="laufende" min="10" max="30" step="5" snaps="true" value="10"></ion-range>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonList, IonRange } from '@ionic/vue';
import { Storage } from '@ionic/storage'

export default defineComponent({
  name: 'EinstellungenComponent',
  data: () => ({
  }),
  components: {
    IonButtons,
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
  top: 50%;
  transform: translateY(-50%);
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
