const searchform = document.getElementById("searchform")
const searchbox = document.getElementById("search-box")
const searchresult = document.getElementById("search-result")
//const showmore = document.getElementById("show-more")
const wallhavenResults = document.getElementById("wallhaven-results");
const openverseResults = document.getElementById("openverse-results");
const giphyResults = document.getElementById("giphy-results");



async function image_search() {

    let keyword = searchbox.value.trim();

    if (!keyword) return;

    

    try {

        const url = `https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(keyword)}`;
        const response = await fetch(`${url}?${keyword}`);
        const data = await response.json();

        console.log(data);

        // Clear previous search results
        wallhavenResults.innerHTML = "";

        // Loop through every image
        data.data.forEach((image) => {

            // Create an image element
            const img = document.createElement("img");

            // Set the image source
            img.src = image.path;
            img.alt = "WallHaven image"
            // Add image to the website
            wallhavenResults.appendChild(img);
            img.addEventListener("click", () => {
        downloadImage(image.path, "wallhaven-image.jpg");
        });

        });

    } catch (error) {

        console.error("Search failed:", error);

    }
}

async function image_search_openverse() {
    

let keyword = searchbox.value.trim();
const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(keyword)}&page_size=20&page=1`;
const response = await fetch(url);

const data = await response.json();
openverseResults.innerHTML = "";

console.log(data.results);

    data.results.forEach(image =>{
        const img = document.createElement("img")
        img.src = image.url;
        img.alt = "Open Verse Image"
        openverseResults.appendChild(img)
        img.addEventListener("click", () => {
    downloadImage(image.url, "openverse-image");
    });
    })


    

}




async function image_search_giphy() {
    const GIPHY_API_KEY = "QmcSI4f2gGrG5xJ7zilMRiXuQxoW1ChG";

    let keyword = searchbox.value.trim();

    if (!keyword) return;

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(keyword)}&limit=10&rating=g`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`GIPHY error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        //const results = document.getElementById("giphy-results");

        giphyResults.innerHTML = "";

        data.data.forEach(image => {

            const img = document.createElement("img");

            img.src = image.images.fixed_width.url;

            img.alt = image.alt_text || image.title || "GIPHY GIF";

            giphyResults.appendChild(img);
            img.addEventListener("click", () => {
     downloadImage(
        image.images.original.url,
        "giphy-animation.gif"
    );
});
            

        });

    } catch (error) {

        console.error("GIPHY search failed:", error);

    }
}




searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    image_search();
    image_search_openverse();
    image_search_giphy();

});


async function downloadImage(url, filename) {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Image download failed");
        }

        const blob = await response.blob();

        const objectURL = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = objectURL;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(objectURL);

    } catch (error) {

        console.error("Download failed:", error);

        window.open(url, "_blank");

    }
}
