import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static deafaultProps ={
      country : 'in',
      pageSize : 9,
      category : 'general'
    }
    static propTypes ={
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string,

    }
    capfirletter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        this.state={
            articles : [],
            loading :true,
            page:1,
            totalResults:0
        }
        document.title =`NewsDaily - ${this.capfirletter(this.props.category)}`;
    }
    async componentDidMount(){
      this.props.setProgress(10);
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d11334847364c71abb17712dc49593c&page=1&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      this.props.setProgress(30);
      let parseddata= await data.json()
      this.props.setProgress(50);
      this.setState({articles: parseddata.articles, totalResults: parseddata.totalResults, loading : false});
      this.props.setProgress(100);
    }
    // handlenextclick= async ()=>{
    //   console.log("next");
    //   if ( !this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
    //     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d11334847364c71abb17712dc49593c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parseddata= await data.json()
    //     console.log(parseddata);
    //     this.setState({
    //       page : this.state.page + 1,
    //       articles: parseddata.articles,
    //       loading:false
    //     })
    //   }
      
    // }
    // handleprevclick = async ()=>{
    //   console.log("prev");
    //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d11334847364c71abb17712dc49593c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let parseddata= await data.json()
    //   console.log(parseddata);
    //   this.setState({
    //     page : this.state.page - 1,
    //     articles: parseddata.articles,
    //     loading:false
    //   })
    // }
    fetchMoreData = async () => {
      this.setState({page: this.state.page+1}) 
       const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d11334847364c71abb17712dc49593c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parseddata= await data.json()
        this.setState({
          articles: this.state.articles.concat(parseddata.articles),
          totalResults: parseddata.totalResults,
        })
    };

  render() {
    return (
      <div className='container my-4' >
        <h1 className="text-center" style={{margin: '40px 0px'}}>Newsdaily - Top {this.capfirletter(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
          { this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <Newsitem  title = {element.title?.length >= 45 ? element.title?.slice(0, 45) : element.title} description = {element.description?.length >= 60 ? element.description?.slice(0, 60) : element.description} imageurl ={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>

          })}
          </div>
          </div>
          </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick ={this.handleprevclick}> &larr; Previous</button>
        <button disabled={(this.state.page+1) > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick ={this.handlenextclick}> &rarr; Next</button>
        </div> */}
            

        
      </div>
    )
  }
}

export default News
