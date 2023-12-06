# Lira Shapira App

<span>
This is the Frontend for the new Lira Shapira App, a local eco-currency. Earn by donating organic waste to your local compost project!

  <p align='center'>
    <img src='https://github.com/LiraShapira/app/assets/78416008/86655879-8047-4253-ac93-c1e88969f0ca' width='200' />
  </p>
עמותת לירה שפירא מפתחת אפליקציה חדשנית למטבעות מקומיים!
העמותה מפעילה מטבע מקומי הנסחר בשכונה ונכרה בתמורה להפרדה וטיפול מקומי בזבל אורגני.
עבור כל קילו של זבל אורגני- מונפקת לירה שפירא אחת.
</span>

<p align='center' padding="8px 0 0 0">
<img width="32px" title="Typescript" src="https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/typescript.svg" style="max-width:100%;">
<img width="32px" title="Redux" src="https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/redux.svg">
<img width="32px" title="React-Native" src="https://reactnative.dev/img/header_logo.svg" style="max-width:100%;"/>
<img width="32px" title="Expo" src="https://seekicon.com/free-icon-download/expo_1.svg" style="max-width:100%;"/>
</p>

## Join us!

Lira Shapira is looking for contributions! 🤚

- check out our github [project](https://github.com/orgs/LiraShapira/projects/1/views/1) for updates and for a list of good [issues to get started with](https://github.com/orgs/LiraShapira/projects/1/views/4).

## To start work on the app:

- fork & clone the repo.

- run `npm i`
- then choose from below options:

### without a local running server:

- run `npm run demo`
- View the app on web or use [Expo Go](https://docs.expo.dev/get-started/expo-go/) to view on your mobile device

### in conjuction with the lira shapira backend:

- git fork and clone the [server repo](https://github.com/LiraShapira/server)
- From the root of server repo, run `npm i` then `npm run devstart` (you will need a running postgres server)
- In the app repo, make a .env file using the .env file contents
  - If you are viewing the app on mobile (using [Expo Go](https://docs.expo.dev/get-started/expo-go/)), you will need to replace 'localhost' in the EXPO_PUBLIC_SERVER_URL environment variables with your [Ipv4 address](https://www.geeksforgeeks.org/how-to-access-localhost-on-mobile-browsers/) to connect to the server. Alternitavely, look into using a tool like [ngrok](https://ngrok.com/).
- run `npm run start` from the root of the app repo
