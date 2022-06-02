<template>
    <ion-card>
        <ion-card-header> 
            <ion-card-subtitle> {{ details.date }} </ion-card-subtitle>
            <ion-card-title> {{ details.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content> {{ [details.player1, details.player2, details.player3, details.player4].join(', ') }} </ion-card-content>
    </ion-card>
</template>

<script>
import { defineComponent } from 'vue'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

export default defineComponent({
    name: 'SpielTile',
    props: ['details'],
    components: {
        IonCard,
        IonCardContent, 
        IonCardHeader, 
        IonCardSubtitle, 
        IonCardTitle, 
    },
})
</script>

<style scoped>

#SpielTileMainDiv {
    border: 1px solid black;
    margin: 10px;
}

</style>
