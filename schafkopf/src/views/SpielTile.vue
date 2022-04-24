<template>
    <ion-card>
        <ion-card-header> 
            <ion-card-subtitle> {{ detail.date }}</ion-card-subtitle>
            <ion-card-title> {{ detail.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content> {{ detail.spieler.join(', ') }}</ion-card-content>
    </ion-card>
</template>

<script>
import { defineComponent } from 'vue'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel } from '@ionic/vue';

export default defineComponent({
    name: 'SpielTile',
    setup() {
        let detail = {
            "name": "Ellmau",
            "date": "24.04.2022",
            "spieler": [
                "Rafi", "Basti", "Simon", "Riva"
            ]
        }
    return {
        detail
    }
    }
})
</script>

<style scoped>

#SpielTileMainDiv {
    border: 1px solid black;
    margin: 10px;
}

</style>
