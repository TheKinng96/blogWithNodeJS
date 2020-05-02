const PATH = './data.json';
const fs = require('fs');

class Post {

    get() {
        return this.readData();
    }

    getIndividualBlog(postID) {
        const posts = this.readData();
        const foundPost = posts.find((post)=> post.id ==postID);
        return foundPost;
    }

    add(newPost) {
        const data = this.readData();
        data.unshift(newPost);
        this.storeData(data);
    }


    readData() {
        try {
            return JSON.parse(fs.readFileSync(PATH, 'utf8'));
        } catch (err) {
            console.error(err)
            return false;
        }
    }

    storeData(data) {
        try {
            fs.writeFileSync(PATH, JSON.stringify(data));
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = Post;