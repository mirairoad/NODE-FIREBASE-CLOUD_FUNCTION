// ------ DB CONNECTION START ------ //
const admin = require("firebase-admin");
const permission = require('../../config/DB_Token.json');
admin.initializeApp({
  credential: admin.credential.cert(permission)
});
const db = admin.firestore();
// ------ DB CONNECTION END ------ //

const createPost = async (req, res) => {
    try {
      await db.collection("posts").doc().create({
        title: req.body.title,
        description: req.body.description,
      });
      return res.status(201).json({
        message: "success",
        document: {
          title: req.body.title,
          description: req.body.description,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

const findPosts = async (req, res) => {
    try {
      const query = db.collection("posts");
      const querySnapshot = await query.get();
      const docs = querySnapshot.docs;
  
      const response = docs.map((doc) => ({
        id: doc.id,
        doc: doc.data(),
      }));
  
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

const findSinglePost = async (req, res) => {
    try {
      const docID = db.collection("posts").doc(req.params.post_id);
      const item = await docID.get();
      const response = item.data();
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

const updatePost = async (req, res) => {
    try {
      const document = db.collection("posts").doc(req.params.post_id);
      await document.update({
        title: req.body.title,
      });
  
      return res.status(200).json({ message: "document updated " });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

const deletePost = async (req, res) => {
    try {
      const doc = db.collection("posts").doc(req.params.post_id);
      await doc.delete();
  
      return res.status(200).json({ message: "delete successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

module.exports = {
    createPost,
    findPosts,
    findSinglePost,
    updatePost,
    deletePost
}