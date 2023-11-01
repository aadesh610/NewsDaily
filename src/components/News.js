import React, {useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=>{

  const[articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capfirletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () =>{
    props.setProgress(10);
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2d11334847364c71abb17712dc49593c&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parseddata= await data.json()
    props.setProgress(50);
    setArticles(parseddata.articles)
    setTotalResults(parseddata.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `Newsdaily - ${capfirletter(props.category)}`
    updateNews();
    // eslint-disable-next-line
  },[])

    const fetchMoreData = async () => {
      const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2d11334847364c71abb17712dc49593c&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1) 
      
        let data = await fetch(url);
        let parseddata= await data.json()
        setArticles(articles.concat(parseddata.articles))
        setTotalResults(parseddata.totalResults)
    };

    return (

      <div className='container my-4' >
        <h1 className="text-center" style={{margin: '40px 0px', marginTop: '90px'}}>Newsdaily - Top {capfirletter(props.category)} Headlines </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
          { articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <Newsitem  title = {element.title?.length >= 45 ? element.title?.slice(0, 45) : element.title} 
                        description = {element.description?.length >= 60 ? element.description?.slice(0, 60) : element.description} 
                        imageurl ={element.urlToImage} 
                        newsurl={element.url} 
                        author={element.author} 
                        date={element.publishedAt} 
                        source={element.source.name}/>
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

News.deafaultProps ={
  country : 'in',
  pageSize : 9,
  category : 'general'
}
News.propTypes ={
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,

}

export default News
