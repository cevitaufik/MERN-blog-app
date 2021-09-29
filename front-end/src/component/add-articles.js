import React from 'react';
import ArticleDataService from '../service/article-service';

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeArticle = this.onChangeArticle.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);

    this.state = {
      id: null,
      title: '',
      article: '',
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({title: e.target.value});
  }

  onChangeArticle(e) {
    this.setState({article: e.target.value});
  }

  saveArticle() {
    const data = {
      title: this.state.title,
      article: this.state.article,
    };

    ArticleDataService.create(data)
        .then((res) => {
          this.setState({
            id: res.data.id,
            title: res.data.title,
            article: res.data.article,
            submitted: true,
          });
          console.log(res.data);
        })
        .catch((e) => console.log(e));
  }

  newArticle() {
    this.setState({
      id: null,
      title: '',
      article: '',
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newArticle}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Article</label>
              <input
                type="text"
                className="form-control"
                id="article"
                required
                value={this.state.article}
                onChange={this.onChangeArticle}
                name="article"
              />
            </div>

            <button onClick={this.saveArticle} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
