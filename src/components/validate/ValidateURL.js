export default function ValidateURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null);
}