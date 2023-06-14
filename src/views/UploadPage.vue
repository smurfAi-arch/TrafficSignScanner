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

        <!--
              <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">{{ $route.name }}</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <div id="container">
          <strong class="capitalize">{{ $route.name }}</strong>
          <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
        </div>
    </ion-content>
      -->
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.name }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-grid>
              <ion-row>
                <ion-col size="auto">
                    <!--<ion-img :src="photo.webviewPath" @click="showActionSheet(photo)"></ion-img>-->
                  <ion-img :src="photos[0]?.webviewPath"></ion-img>
                  <ion-title class="ion-text-center title-link" @click="openGoogleLink()">{{ photos[0]?.predictedClass }}</ion-title>
                </ion-col>
              </ion-row>
            </ion-grid>


            <ion-fab vertical="bottom" horizontal="center" slot="fixed">
                <ion-fab-button @click="takePhoto()">
                    <ion-icon :icon="camera"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>
  
  <script setup lang="ts">
  import { camera, trash, close } from 'ionicons/icons';
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { usePhotoManager, UserPhoto } from '@/composables/usePhotoManager.js';
  import { Browser } from '@capacitor/browser';

const { photos, takePhoto } = usePhotoManager();
const openGoogleLink = async () => {
  await Browser.open({ url: photos.value[0].googleSearchLink });
};
  </script>
  
  <style scoped>
  .title-link {
  padding: 20px 0px;
  color: rgb(75, 75, 255);
  text-decoration: underline;
}
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
  