# GestioneAuleStudioUnicam
Progetto IdS - Laboratorio

Se non si è ancora inizializzato il tutto, con la linea di comando usate "npm install" nella cartella del progetto

Per runnare il server in modalità developer, è stato aggiunto Nodemon, che si autorestarta ad ogni cambiamento nei file. Basta scrivere "npm run dev" come linea di comando per runnarlo.

In app sono presenti 3 cartelle, una per i models, ossia gli elementi del database, una per le views, ossia le pagine da servire, e una per i controllers, ossia i collegamenti tra models e views. In config saranno presenti le routes e i vari files di configurazione. In node_modules sono presenti tutti i moduli di node. In public, diviso in css, images, e js, andranno tutti i file statici dell'applicazione. 

index.js è l'entry point dell'applicazione, quindi se la si volesse runnare tramite Node, basterebbe scrivere il comando "node index.js".

Link di riferimento:
-https://www.sitepoint.com/node-js-mvc-application/

-https://zellwk.com/blog/crud-express-mongodb/

-https://github.com/madhums/node-express-mongoose-demo

-http://masteringionic.com/blog/2017-12-22-node-development-for-an-ionic-application/
