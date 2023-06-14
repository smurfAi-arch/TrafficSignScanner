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
          <ion-col>
            <h1>Welcome to our traffic sign recognition application!</h1>
            <p>We are dedicated to providing you with a convenient and efficient tool for detecting and interpreting traffic signs, ultimately promoting road safety. This About Us section aims to offer insights into our application's functionality and the technology behind it.</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h2>Our Vision:</h2>
            <p>At our core, we envision a world where road accidents caused by human error are significantly reduced. By harnessing the power of advanced machine learning algorithms and computer vision techniques, we strive to create an application that assists drivers in recognizing and understanding traffic signs accurately.</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h2>How It Works:</h2>
            <p>Our application utilizes cutting-edge technology to analyze real-time video streams captured by your device's camera. Through a combination of image processing, pattern recognition, and machine learning algorithms, we aim to detect and interpret various traffic signs with speed and precision.</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h2>The Process:</h2>
            <p>When you access the application, the main interface displays a sliding menu on the left, which serves as the principal element of the graphical user interface. This menu allows you to navigate through the available pages of the application: Upload, History, Trash, Favorites, and About Us.</p>
            <p>The Upload page enables you to upload images of traffic signs by accessing your device's camera or gallery. Additionally, you can view your most recent uploads here, providing easy access to your recent interactions with the application.</p>
            <p>The History page presents a comprehensive list of all your uploads, not just the recent ones. This feature allows you to revisit and review your previous interactions with the application, providing a sense of organization and accessibility.</p>
            <p>In the Trash section, you can find items that you have deleted from the application's history. This feature ensures that you have the flexibility to manage and restore previously deleted items if needed.</p>
            <p>Lastly, the About Us section serves as a dedicated space to provide you with an understanding of our application's functionality. Here, we explain how our system processes images and the underlying technology that drives its performance. We acknowledge that, despite our best efforts, there may be occasional errors in image processing, and this section aims to address any concerns you may have.</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h2>Conclusion:</h2>
            <p>We are committed to continuously improving our application to enhance its accuracy, reliability, and user experience. Your feedback and suggestions are valuable to us as we strive to make our roads safer for everyone. Thank you for choosing our traffic sign recognition application, and we hope it proves to be a valuable companion in your daily journeys.</p>
          </ion-col>
        </ion-row>
      </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
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
  