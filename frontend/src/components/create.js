import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
 
export default function Create() {
 const [form, setForm] = useState({
   title: "",
   author: "",
   journal: "",
   year: "",
   volume: "",
   number: "",
   pages: "",
   doi: "",
   claim: ""
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newArticle = { ...form };
 
   await axios.post('/article/add',newArticle).then(res=>{
    if(res.data.success===1)
    {
      console.log("evidence added");
    }
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ title: "",
    author: "",
    journal: "",
    year: "",
    volume: "",
    number: "",
    pages: "",
    doi: "", 
    claim: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Submit an Article</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="title">Title</label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="author">Author</label>
         <input
           type="text"
           className="form-control"
           id="author"
           value={form.author}
           onChange={(e) => updateForm({ author: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="journal">Journal Name</label>
         <input
           type="text"
           className="form-control"
           id="journal"
           value={form.journal}
           onChange={(e) => updateForm({ journal: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="year">Year</label>
         <input
           type="text"
           className="form-control"
           id="year"
           value={form.year}
           onChange={(e) => updateForm({ year: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="volume">Volume Number</label>
         <input
           type="text"
           className="form-control"
           id="volume"
           value={form.volume}
           onChange={(e) => updateForm({ volume: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="number">Number</label>
         <input
           type="text"
           className="form-control"
           id="number"
           value={form.number}
           onChange={(e) => updateForm({ number: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="pages">Pages</label>
         <input
           type="text"
           className="form-control"
           id="pages"
           value={form.pages}
           onChange={(e) => updateForm({ pages: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="doi">DOI</label>
         <input
           type="text"
           className="form-control"
           id="doi"
           value={form.doi}
           onChange={(e) => updateForm({ doi: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="claim">Claim Type</label>
         <input
           type="text"
           className="form-control"
           id="claim"
           value={form.claim}
           onChange={(e) => updateForm({ claim: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Submit Article"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}