import React from 'react';
import ReviewsNav from './ReviewsNav.jsx';
import ReviewsMain from './ReviewsMain.jsx';
import style from './css/app.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
    this.fetchReviews = this.fetchReviews.bind(this);
    // this.refreshReviews = this.refreshReviews.bind(this);
  }

  componentDidMount() {
    // this.refreshReviews();
    this.fetchReviews();
  }

  // refreshReviews() {
  //   axios
  //     .delete('/api/reviews/delete')
  //     .then(() => {
  //       this.fetchReviews();
  //     })
  //     .catch(err => console.log('error delete all:', err))
  // }

  fetchReviews() {
    axios
      .get('/api/reviews')
      .then(({ data }) => {
        this.setState({
          reviews: data
        }, () => {
          console.log(this.state.reviews)
        })
      })
      .catch(err => console.log("get error: ", err))
  }

  render() {
    return (
      <div className={style.container}>
        <ReviewsNav className={style.reviewsNav} reviews={this.state.reviews} />
        <ReviewsMain reviews={this.state.reviews} />
      </div>
      )
  }
}

export default App;