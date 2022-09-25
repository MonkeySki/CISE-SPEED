import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const Article = (props) => (
 <tr>
   <td>{props.article.title}</td>
   <td>{props.article.author}</td>
   <td>{props.article.journal}</td>
   <td>{props.article.year}</td>
   <td>{props.article.volume}</td>
   <td>{props.article.number}</td>
   <td>{props.article.pages}</td>
   <td>{props.article.doi}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.article._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteArticle(props.article._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function ArticleList() {
 const [articles, setArticles] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getArticles() {
   
    await axios.get('/article').then(res=>{
      console.log(res)
      if(!res.statusText==="OK"){
        console.log("checking for articles")
        const message = `An error occurred: /article `;
        window.alert(message);
        return;
      }
      const articles = res.data;
      console.log(articles)
      setArticles(articles);
     });
  
   }
 
   getArticles();
 
   return;
 }, [articles.length]);
 
 // This method will delete a record
 async function deleteArticle(id) {
   await fetch(`/${id}`, {
     method: "DELETE"
   });
 
   const newArticles = articles.filter((el) => el._id !== id);
   setArticles(newArticles);
 }
 
 // This method will map out the records on the table
 function articleList() {
   return articles.map((article) => {
     return (
       <Article
         article={article}
         deleteArticle={() => deleteArticle(article._id)}
         key={article._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Article List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Title</th>
           <th>Author</th>
           <th>Journal Name</th>
           <th>Year</th>
           <th>volume</th>
           <th>Number</th>
           <th>Pages</th>
           <th>DOI</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{articleList()}</tbody>
     </table>
   </div>
 );
}