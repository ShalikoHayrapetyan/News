import { db } from "../App"

const newsSvc = {
    async updateLikedState(newsId, likeCount) {
        const washingtonRef = db.collection("news").doc(newsId);
        return washingtonRef.update({
            like: likeCount
        })
    },
    async getAllNewsData() {
        return db.collection("news")
            .orderBy("timestamp")
            .get()
    }
}

export default newsSvc;