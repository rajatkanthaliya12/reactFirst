import _ from 'lodash';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import VideoList from "./component/video_list";
import VideoDetails from "./component/video_detail";
import SearchBar from './component/search_bar';

const API_KEY = "AIzaSyD01YSiNJmg51mM6aojo0kGt0BsOUNUZPU";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedVideo: null, videos: [] };

    this.videoSearch("");
  }

  videoSearch(term){
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    });
  }
  render() {
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)},400);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetails video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
