import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceWorker, Analytics, AWSKinesisProvider } from 'aws-amplify';






const serviceWorker = new ServiceWorker();
Analytics.addPluggable(new AWSKinesisProvider());

// Configure the plugin after adding it to the Analytics module
Analytics.configure({
  AWSKinesis: {

      // OPTIONAL -  Amazon Kinesis service region
      region: 'us-east-1',
      
      // OPTIONAL - The buffer size for events in number of items.
      bufferSize: 1000,
      
      // OPTIONAL - The number of events to be deleted from the buffer when flushed.
      flushSize: 100,
      
      // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
      flushInterval: 5000, // 5s
      
      // OPTIONAL - The limit for failed recording retries.
      resendLimit: 5
  } 
});



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'firstAngularTrial';

  registeredServiceWorker: any;

/*   name: "Hello World",
  attributes:  */

  async testAnalytics() {


    const KinesisProvider = Analytics.getPluggable('AWSKinesis');
    KinesisProvider.record({
        event:{
        data: "Hello world",
        partitionKey: 'myPartitionKey', 
        streamName: 'firstangulartrialKinesis-dev' // your amplify cloudformation created kinesis stream name 
        },
       provider:"AWSKinesis"
      }).then(
        (res: any) => {
          console.log(res);
          }).catch(
            (err: any) => {
              console.log(err);
            });
  }

  async registerServiceWorker() {
    try {
      // Register the service worker with `service-worker.js` with service worker scope `/`.
      this.registeredServiceWorker = await serviceWorker.register('/service-worker.js', '/');
      console.log("Trying installing Service Worker");
      //console.log(this.registeredServiceWorker);

      if (this.registeredServiceWorker.installing) {
        console.log('Service worker installing');
      } else if (this.registeredServiceWorker.waiting) {
        console.log('Service worker installed');
      } else if (this.registeredServiceWorker.active) {
        console.log('Service worker active');
      }

      console.log("Registered Service Worker: ", this.registeredServiceWorker);
    } catch (error) {
      console.log('[registerServiceWorker] Error registering service worker: ', error);
    }
  }

  ngOnInit(): void {
    this.registerServiceWorker();
    navigator.serviceWorker.ready.then((res: any)=>{
      res.active.postMessage("Message from Angular client to the Service Worker");
    });
    navigator.serviceWorker.addEventListener('message', event => {
      //console.log(event);
      console.log("Listener working! The message from the worker is: "+event.data);
    });

    this.testAnalytics();
  
  
  }



  ngOnDestroy(): void {
      
  }
}


