const util = require('../../../../utils/util')
class Movie {
  constructor(url) {
    this.url = url;
  }

  getMovieData(cb) {
    console.log('this', this)
    // this代表movie的一个实例
    console.log('cb', cb)
    this.cb = cb;
    util.getMoreMovies(this.url, this.processDoubanData.bind(this));
  }

  processDoubanData(data) {
    if(!data) {
      return;
    }
    let director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
        if (data.directors[0].avatars != null) {
            director.avatar = data.directors[0].avatars.large

        }
        director.name = data.directors[0].name;
        director.id = data.directors[0].id;
    }
    let movie = {
        movieImg: data.images ? data.images.large : "",
        country: data.countries[0],
        title: data.title,
        originalTitle: data.original_title,
        wishCount: data.wish_count,
        commentCount: data.comments_count,
        year: data.year,
        generes: data.genres.join("、"),
        stars: util.convertToStarsArray(data.rating.stars),
        score: data.rating.average,
        director: director,
        casts: util.convertToCastString(data.casts),
        castsInfo: util.convertToCastInfos(data.casts),
        summary: data.summary
    }
    this.cb(movie);
  }   
}

export {Movie}
