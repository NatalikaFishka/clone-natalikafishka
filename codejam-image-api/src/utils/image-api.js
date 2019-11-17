
export default async function unsplashUrl() {
    const url = 'https://api.unsplash.com/photos/random?query=town,Minsk&client_id=196b80d7ba2c92d42c480c466d9896b09909ffb5fc28847b1dcd980fb4b63e44';
    let imageProm = await fetch(url);
    let imageJson = await imageProm.json();
    return await imageJson.urls.small;
}
