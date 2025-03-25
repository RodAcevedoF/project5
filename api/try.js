
export const trybook = async () => {
try {
    const response = await fetch("https://openlibrary.org/search.json?q=the+lord+of+the+rings");
const data = await response.json();
    console.log(data)

} catch (e) {
    console.log(e);
}
}