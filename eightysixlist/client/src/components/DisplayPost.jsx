import React, { Component } from "react";
import PostCard from './PostCard'
import { getAllPosts } from "../services/posts";

class DisplayPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  async componentDidMount() {
    const posts = await getAllPosts();
    this.setState({ posts });
  }

  render() {
    const CARDS = this.state.posts
      .filter(post => this.props.currentUser.restaurant_id === post.restaurant_id)
      .reverse()
      .map((post, index) =>
        index < 8 ? (
          <PostCard
            id={post.id}
            title={post.title}
            content={post.content}
            image_url={post.image_url }
            key={index}
          />
        ) : null
      );

    return (
      <div className="post-cards">
        <div className="cards">{CARDS}</div>
      </div>
    );
  }
}

export default DisplayPost;
