<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>{{ $route.name }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.name }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-grid>
                <ion-row>
                    <ion-col size="6" v-for="photo in deletedPhotos" :key="photo">
                        <ion-img :src="photo?.webviewPath"></ion-img>
                    </ion-col>
                </ion-row>
            </ion-grid>
    
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { trash, close } from 'ionicons/icons';
import { actionSheetController, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { usePhotoManager, UserPhoto } from '@/composables/usePhotoManager.js';

const { deletedPhotos, deletePhoto } = usePhotoManager();

const showOptions = async (photo: UserPhoto) => {
    const actionSheet = await actionSheetController.create({
        header: 'Photos',
        buttons: [
            {
                text: 'Delete',
                role: 'destructive',
                icon: trash,
                handler: () => {
                    deletePhoto(photo);
                },
            },
            {
                text: 'Cancel',
                icon: close,
                role: 'cancel',
                handler: () => {
                    // Nothing to do, action sheet is automatically closed
                },
            },
        ],
    });
    await actionSheet.present();
};
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
  