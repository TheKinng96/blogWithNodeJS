

const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    fetch(API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data)=>{
        buildPosts(data);
    })
}

const buildPosts = (blogPosts) => {
    let blogPostsContent = "";
    for (blogPost of blogPosts){
        const postDate = new Date(parseInt(blogPost.added_date)).toDateString();
        //todatestring will convert time from string to string, parseInt convert num to str
        const postImage = `${API_BASE_URL}${blogPost.post_image}`;
        blogPostsContent += `
        <div class="content">
            <div class="blog-img" style="background-image: url(${postImage})"></div>
            <div class="post-content">
                <div class="blog-date">${postDate}</div>
                <div class="blog-title"><h4>${blogPost.title}</h4></div>
                <div class="short-message">${blogPost.content}</div>
            </div>
        </div>
        `
    }
    document.querySelector(".blog-posts").innerHTML = blogPostsContent;
}