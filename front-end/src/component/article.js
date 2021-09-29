import React from 'react';
import ArticleDataService from '../service/article-service';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeArticle = this.onChangeArticle.bind(this);
    this.getAricle = this.getAricle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = {
      currentArticle: {
        id: null,
        title: '',
        article: '',
      },
      message: '',
    };
  }

  componentDidMount() {
    this.getAricle(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState((prevState) => {
      return {
        currentArticle: {
          ...prevState.currentArticle,
          title: title,
        },
      };
    });
  }

  onChangeArticle(e) {
    const article = e.target.value;

    this.setState((prevState) => ({
      currentArticle: {
        ...prevState.currentArticle,
        article: article,
      },
    }));
  }

  getAricle(id) {
    ArticleDataService.get(id)
        .then((response) => {
          this.setState({
            currentArticle: response.data,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  }

  updateArticle() {
    ArticleDataService.update(
        this.state.currentArticle.id,
        this.state.currentArticle,
    )
        .then((response) => {
          console.log(response.data);
          this.setState({
            message: 'The tutorial was updated successfully!',
          });
        })
        .catch((e) => {
          console.log(e);
        });
  }

  deleteArticle() {
    ArticleDataService.delete(this.state.currentArticle.id)
        .then((response) => {
          console.log(response.data);
          // eslint-disable-next-line react/prop-types
          this.props.history.push('/article');
        })
        .catch((e) => {
          console.log(e);
        });
  }

  render() {
    const {currentArticle} = this.state;

    return (
      <div>
        {currentArticle ? (
          <div className="edit-form">
            <h4>Article</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentArticle.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="article">Article</label>
                <input
                  type="text"
                  className="form-control"
                  id="article"
                  value={currentArticle.article}
                  onChange={this.onChangeArticle}
                />
              </div>
            </form>

            <button
              className="btn btn-danger mr-2"
              onClick={this.deleteArticle}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateArticle}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Article...</p>
          </div>
        )}
      </div>
    );
  }
}