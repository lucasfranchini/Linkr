export default function validateURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null);
}