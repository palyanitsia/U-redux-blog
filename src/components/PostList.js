import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchPostsAndUsers } from "../actions";

//components
import UserHeader from "../components/UserHeader";

class PostList extends Component {
  componentDidMount() {
    const { fetchPostsAndUsers } = this.props;
    fetchPostsAndUsers();
  }

  renderList() {
    const { posts } = this.props;
    return posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body} </p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}
const mapStateToProps = state => {
  return { posts: state.posts };
};
//TODO mapStateToProps func && pass to connect below
export default connect(
  mapStateToProps,
  { fetchPostsAndUsers }
)(PostList);
