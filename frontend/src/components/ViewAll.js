import React, { Component } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

class ViewAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios
    .get('http://localhost:8080/articles')
    .then(res => {

      if(res.data.success === 1)
      {
        this.setState({
          articles: res.data.result
        })
        console.log('Getting data from repository!!!');
      }
    })
    .catch(err =>{
      console.log('Error getting details from the repository!!!');
    })
  };

  render() {
  
    const articles = this.state.articles;
    console.log("PrintBook: " + articles);
    let articleList;

    if(!articles) {
      articleList = "There are no articles in the repository!";
    } else {
        articleList = articles.map((article, k) =>
        <BookCard article={article} key={k} />
      );
      
    }

    return (
      <div className="ViewAll">
        <div className="wrapper">
        <p>Hi, is Bex</p>
          <div className="article-list">
            
              {articleList}
          </div>

        </div>
      </div>
    );
  }
}

export default ViewAll;