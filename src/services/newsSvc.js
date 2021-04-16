import { db } from "../App"

const newsSvc = {
    async updateLikedState(newsId, likeCount) {
        const washingtonRef = db.collection("news").doc(newsId);
        return washingtonRef.update({
            like: likeCount
        })
    },
    async updateCommentsData(newsId,commentsData){
        const washingtonRef = db.collection("news").doc(newsId);
        return washingtonRef.update({
            comments: commentsData
        })

    },
    async getAllNewsData() {
        return db.collection("news")
            .orderBy("timestamp")
            .get()
    },
    async getAllCategoryData() {
        return  db.collection("categories")
          .get()
    },
    
}

export default newsSvc;