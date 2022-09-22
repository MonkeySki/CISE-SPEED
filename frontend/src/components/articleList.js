import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Article = (props) => (
 <tr>
   <td>{props.article.title}</td>
   <td>{props.article.authors}</td>
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
     const response = await fetch(`http://localhost:5000/article/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const articles = await response.json();
     setArticles(articles);
   }
 
   getArticles();
 
   return;
 }, [articles.length]);
 
 // This method will delete a record
 async function deleteArticle(id) {
   await fetch(`http://localhost:5000/${id}`, {
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
           <th>Authors</th>
           <th>DOI</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{articleList()}</tbody>
     </table>
   </div>
 );
}