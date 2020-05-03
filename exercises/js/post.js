/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */
 //query params

const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
    getPostIDParam();
} 

getPostIDParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id")
}

const getPost = () => {
    const postId = getPostIDParam();
    const url = `${API_URL}${postId}`
    fetch(url, {
        method:"GET"
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildPost(data)
    })
}

const buildPost = (data) => {
    const postDate = new Date(parseInt(data.added_date)).toDateString();
    const postImage = `${API_BASE_URL}${data.post_image}`;
    document.querySelector('header').style.backgroundImage = `url(${postImage})`;
    document.getElementById('individual-post-title').innerHTML = data.title;
    document.getElementById('individual-post-content').innerHTML = data.content;
    document.getElementById('individual-post-date').innerHTML = `Published on ${postDate}`;
}

