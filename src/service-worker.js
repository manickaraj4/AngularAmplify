addEventListener('message', (event) => {
    console.log('Worker Log... Got the message from the client: ', event.data);
    event.source.postMessage("Hello Angular From the Service Worker");
}

    );