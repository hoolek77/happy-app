import ContentProvider from '../../shared/contentProvider'

import NewsList from './newsList'
import News from './news'
import NewsCountries from './newsCountries'

export default class NewsContentProvider extends ContentProvider {
  constructor(api, view) {
    super(api, view)

    view.eventListener = this

    this.newsListModel = new NewsList()
    this.currentPage = 1
    this.pageSize = 20
    this.totalResults = 0

    this.supportedCountries = new NewsCountries()
    this.supportedCategories = [
      'business',
      'entertainment',
      'general',
      'health',
      'science',
      'sports',
      'technology',
    ]

    this.selectedCountry = null
    this.selectedCategory = null
    this.searchText = null
  }

  setup() {
    this.view.bindEvents()
  }

  cleanUp() {
    this.view.unbindEvents()
  }

  getTitle() {
    return 'News'
  }

  getHeaderText() {
    return 'News'
  }

  async getContent() {
    this.searchText = null
    this.currentPage = 1
    const news = await this._fetchNewsData(this.currentPage)
    this.newsListModel.addNews(news)

    return this.view.render(
      news,
      this.supportedCountries.countries,
      this.supportedCategories,
      this.selectedCountry,
      this.selectedCategory
    )
  }

  getClickedNews(id) {
    const news = this.newsListModel.findNews(id)

    return news
  }

  async loadMoreNews() {
    if (this._hasMoreNews()) {
      this.currentPage++

      this._loadNews()
    }
  }

  onCountryChange(countryIsoCode) {
    this.selectedCountry =
      this.supportedCountries.countries.find(
        (country) => country.isoCode === countryIsoCode
      ) || null

    this.currentPage = 1

    this.view.clearNewsList()
    this._loadNews()
  }

  onCategoryChange(category) {
    if (this.supportedCategories.includes(category)) {
      this.selectedCategory = category
    } else {
      this.selectedCategory = null
    }

    this.currentPage = 1

    this.view.clearNewsList()
    this._loadNews()
  }

  onSearchTextEnetered(searchText) {
    this.searchText = encodeURIComponent(searchText)

    this.currentPage = 1

    this.view.clearNewsList()
    this._loadNews()
  }

  async _loadNews() {
    this.view.showSpinner()

    const news = await this._fetchNewsData(this.currentPage)
    this.newsListModel.addNews(news)

    this.view.renderNewData(news)
    this.view.hideSpinner()
  }

  async _fetchNewsData(page) {
    try {
      let apiResponse = JSON.parse(
        '{"status":"ok","totalResults":749,"articles":[{"source":{"id":"news24","name":"News24"},"author":null,"title":"Liquor traders call for off-site alcohol sales to protect livelihoods","description":"The government had instituted bans and restrictions on the sale of alcohol to ensure that hospital beds are available for Covid-19 patients and are not filled with liquor related trauma cases stemming from car accidents and violence","url":"https://www.news24.com/fin24/Economy/liquor-traders-call-for-off-site-alcohol-sales-to-protect-livelihoods-20210105","urlToImage":"https://cdn.24.co.za/files/Cms/General/d/4549/a156f3aaf05e4befb861e521ccd4fbe7.jpg","publishedAt":"2021-01-05T18:41:39+00:00","content":"<ul><li>South Africa has had a series of bans on the sale of alcohol, that have been imposed and lifted since the beginning of the lockdown in March last year</li><li>Lucky Ntimane, convenor of the L… [+2615 chars]"},{"source":{"id":"news24","name":"News24"},"author":null,"title":"Land Bank needs R7m bailout to ease financial woes, auditor-general says","description":"Gaps in the financial statements of state-owned agricultural bank are a concern for creditors already fretting over the slow progress in turning the lender around.","url":"https://www.news24.com/fin24/Companies/Banks/audit-woes-at-land-bank-has-bondholders-worried-20210105","urlToImage":"https://cdn.24.co.za/files/Cms/General/d/10099/a4ed1a32d6484674bc291eaf47c74447.jpg","publishedAt":"2021-01-05T18:40:24+00:00","content":"<ul><li>Gaps in the financial statements of the state-owned agricultural bank are a concern for creditors already anxious over the slow progress in turning the lender around.</li><li>Auditors are que… [+3011 chars]"},{"source":{"id":"news24","name":"News24"},"author":null,"title":"Putin, Merkel discuss possible joint vaccine production","description":"Russian President Vladimir Putin and German Chancellor Angela Merkel discussed the possibility of jointly producing coronavirus vaccines in a phone call, the Kremlin said Tuesday.","url":"https://www.news24.com/fin24/Economy/putin-merkel-discuss-possible-joint-vaccine-production-20210105","urlToImage":"https://cdn.24.co.za/files/Cms/General/d/9014/e23d60a5253d4ddf8e50469d8ac6562e.jpg","publishedAt":"2021-01-05T18:26:16+00:00","content":"<ul><li>Russian President Vladimir Putin and German Chancellor Angela Merkel discussed the possibility of jointly producing coronavirus vaccines.</li><li>Both Russia and Germany have recently started… [+2527 chars]"},{"source":{"id":"news24","name":"News24"},"author":null,"title":"World Bank sees SA economy growing by 3.3% in 2021","description":"The World Bank sees the SA economy rebound with growth of 3.3% in 2021, following a steep contraction of 7.8% in 2020 due to the impact of the Covid-19 pandemic.","url":"https://www.news24.com/fin24/Economy/world-bank-sees-sa-economy-growing-by-33-in-2021-20210105","urlToImage":"https://cdn.24.co.za/files/Cms/General/d/10591/220df8b7bc3d4b328e396004cc92d579.jpg","publishedAt":"2021-01-05T18:20:16+00:00","content":"<ul><li>The World Bank has forecast the SA economy to recover with growth of 3.3%, compared to a steep contraction of 7.8% estimated for 2020.</li><li>According to the bank, SA suffered the \\"most sev… [+5877 chars]"},{"source":{"id":"news24","name":"News24"},"author":null,"title":"Have you seen this man? Police on the hunt for murder suspect","description":"Eastern Cape organised crime investigators have launched a manhunt for an alleged murderer.","url":"https://www.news24.com/news24/SouthAfrica/News/have-you-seen-this-man-police-on-the-hunt-for-alleged-murder-suspect-20210105","urlToImage":"https://cdn.24.co.za/files/Cms/General/d/9670/a7c40d1fbb9d47e7b49408f1b8dacc36.jpg","publishedAt":"2021-01-05T18:06:45+00:00","content":"<ul><li>Eastern Cape organised crime investigators have launched a manhunt for an alleged murderer.</li><li>Darren Lee Witbooi is wanted for allegedly killing Chester Williams, 24, on 13 December in … [+1227 chars]"},{"source":{"id":"news24","name":"News24"},"author":null,"title":"A mix of Springboks, up-and-coming stars in Bulls\' side to take on Lions","description":"Bulls Director of Rugby Jake White has named his side to face the Lions in a Currie Cup clash at Loftus Versveld on Wednesday.","url":"https://www.news24.com/sport/Rugby/CurrieCup/a-mix-of-springboks-up-and-coming-stars-in-bulls-side-to-take-on-lions-20210105","urlToImage":"https://cdn.24.co.za/files/Cms/General/d/10612/5e14b2b2f1ad4ce6bcbeb070828dbf6b.jpg","publishedAt":"2021-01-05T17:54:43+00:00","content":"Bulls Director of Rugby Jake White has named his side to face the Lions in a Currie Cup clash at Loftus Versveld on Wednesday.\\r\\nThe Bulls initially named an extended squad on Tuesday as the team were… [+1642 chars]"},{"source":{"id":"buzzfeed","name":"Buzzfeed"},"author":"[{\\"@type\\":\\"Person\\",\\"name\\":\\"Sarah Aspler\\",\\"url\\":\\"https://www.buzzfeed.com/sarahaspler\\",\\"jobTitle\\":\\"BuzzFeed Staff, Canada\\"}]","title":"Eat Cheesy Foods For Breakfast, Lunch, And Dinner, And We\'ll Guess Your Age With 37% Accuracy","description":"Brie it on!","url":"https://www.buzzfeed.com/sarahaspler/cheese-for-every-meal-age-quiz","urlToImage":"https://img.buzzfeed.com/buzzfeed-static/static/2020-12/30/16/enhanced/541ad6e982f0/original-3042-1609347334-5.jpg?crop=2984:1562;16,104%26downsize=1250:*","publishedAt":"2021-01-05T17:37:27.3924204Z","content":"Get all the best Tasty recipes in your inbox! Sign up for the Tasty newsletter today!"},{"source":{"id":"bbc-sport","name":"BBC Sport"},"author":"BBC Sport","title":"Any big player welcome at PSG - Pochettino","description":"New boss Mauricio Pochettino says \\"any big player in the world is always welcome at Paris St-Germain\\" as they continue to be linked with Lionel Messi.","url":"http://www.bbc.co.uk/sport/football/55550479","urlToImage":"https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/9C95/production/_116358004_mba.jpg","publishedAt":"2021-01-05T17:37:25.5022665Z","content":"PSG have won the French league in seven of the last eight seasons\\r\\nNew manager Mauricio Pochettino says \\"any big player in the world is always welcome at Paris St-Germain\\" as the club continues to be… [+1717 chars]"},{"source":{"id":"hacker-news","name":"Hacker News"},"author":"Eric Berger","title":"There are an insane amount of cool space things happening in 2021","description":"Yeah, we\'re going to say it. We really think Webb is going to launch this year.","url":"https://arstechnica.com/?p=1730399","urlToImage":"https://cdn.arstechnica.net/wp-content/uploads/2020/12/c1-edl_illustration_smaller-760x380.jpg","publishedAt":"2021-01-05T17:37:24.2525764Z","content":"Enlarge/ In this illustration of its descent to Mars, the spacecraft containing the Perseverance rover slows down using the drag generated by plunging through the Martian atmosphere. \\r\\n88 with 47 pos… [+6223 chars]"},{"source":{"id":"fox-news","name":"Fox News"},"author":"Fox News","title":"Hawley: Washington Post printed \'outright lies\' to defend ‘Antifa scumbags’ who congregated at his home","description":"Sen. Josh Hawley, R-Mo., blasted the Washington Post on Tuesday, accusing the newspaper of \\"printing outright lies\\" and falsely painting Antifa violence outside his home as a peaceful vigil.","url":"https://www.foxnews.com/media/hawley-washington-post-outright-lies-antifa-scumbags-congregated-home","urlToImage":"https://cf-images.us-east-1.prod.boltdns.net/v1/static/694940094001/332fd3b8-201f-4682-b670-8b03056238df/a49cedcf-5e90-4a96-bf4d-68742cc70f59/1280x720/match/image.jpg","publishedAt":"2021-01-05T17:37:23.9089127Z","content":"Sen. Josh Hawley, R-Mo., blasted the Washington Post on Tuesday, accusing the newspaper of \\"printing outright lies\\" and falsely painting Antifa violence outside his home as a peaceful vigil.\\r\\nHawley … [+2543 chars]"},{"source":{"id":"ign","name":"IGN"},"author":null,"title":"NBA 2K21 - Next Gen is Game Trailer - IGN","description":"Check out the latest trailer for the game and celebrate the return of the NBA season in Next Gen NBA 2K21.","url":"https://www.ign.com/videos/nba-2k21-next-gen-is-game-trailer","urlToImage":"https://assets1.ignimgs.com/thumbs/userUploaded/2020/12/22/nba2kthumb-1608653895492.jpg?width=1280","publishedAt":"2021-01-05T17:37:19.8474233Z","content":"Did you enjoy this video?"},{"source":{"id":"buzzfeed","name":"Buzzfeed"},"author":"[{\\"@type\\":\\"Person\\",\\"name\\":\\"Stephen LaConte\\",\\"url\\":\\"https://www.buzzfeed.com/stephenlaconte\\",\\"jobTitle\\":\\"BuzzFeed Staff\\"}]","title":"Arnold Schwarzenegger Called Chris Pratt \\"Chris Evans\\" On Instagram Live, And It Was Hilariously Awkward","description":"\\"I should know your name... You\'re my favorite son-in-law.\\"","url":"https://www.buzzfeed.com/stephenlaconte/arnold-schwarzenegger-calls-chris-pratt-chris-evans","urlToImage":"https://img.buzzfeed.com/buzzfeed-static/static/2021-01/5/17/enhanced/a33e60e64038/original-28387-1609866939-10.jpg?crop=1581:830;0,0%26downsize=1250:*","publishedAt":"2021-01-05T17:37:19.3787898Z","content":"\\"I should know your name... You\'re my favorite son-in-law.\\""},{"source":{"id":"fox-news","name":"Fox News"},"author":"Fox News","title":"Nancy Pelosi disregarding election challenge would be ‘bad look’: Gaetz","description":"House Speaker Nancy Pelosi disregarding the GOP’s objection to the 2020 presidential election would be a \\"bad look\\" for the House of Representatives, Rep. Matt Gaetz said on Tuesday.","url":"https://www.foxnews.com/politics/nancy-pelosi-election-dispute-matt-gaetz","urlToImage":"https://static.foxnews.com/foxnews.com/content/uploads/2021/01/AP20365603854897-e1609677080126.jpg","publishedAt":"2021-01-05T17:37:19.1444732Z","content":"House Speaker Nancy Pelosi disregarding the GOP’s objection to the 2020 presidential election would be a \\"bad look\\" for the House of Representatives, Rep. Matt Gaetz, R-Fla., said on Tuesday.\\r\\n\\"We ha… [+2655 chars]"},{"source":{"id":"cbs-news","name":"CBS News"},"author":"CBS News","title":"New York Governor Andrew Cuomo gives COVID-19 update after new strain detected","description":"The state\'s first confirmed diagnosis of the contagious new strain was detected in Saratoga Springs.","url":"https://www.cbsnews.com/news/andrew-cuomo-new-york-covid-press-conference-live-stream-today-2021-01-05/","urlToImage":"https://cbsnews2.cbsistatic.com/hub/i/r/2021/01/05/d378387b-ea54-4567-8a70-f2ff3dad33d1/thumbnail/1200x630g2/c98494c56c13d2c4f9119f4223d2c328/cuomo4.png","publishedAt":"2021-01-05T17:32:00+00:00","content":"This story will be updated\\r\\nNew York Governor Andrew Cuomo gave a COVID-19 update Tuesday after the highly transmissible new strain of the coronavirus was detected in upstate New York. \\r\\nThe state\'s … [+711 chars]"},{"source":{"id":"the-verge","name":"The Verge"},"author":"Tom Warren","title":"Microsoft’s ambitious Minecraft Earth game is closing down on June 30th","description":"Minecraft Earth is shutting down on June 30th. Microsoft has made the difficult decision to close the game down after the global pandemic has made it hard for players to play the game.","url":"https://www.theverge.com/2021/1/5/22215253/minecraft-earth-closing-down-june-2021-microsoft","urlToImage":"https://cdn.vox-cdn.com/thumbor/e3YKGDzVm0aqRBxrElqC7viVwg0=/0x40:2040x1108/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/16280813/minecraftearth.jpg","publishedAt":"2021-01-05T17:31:02Z","content":"The ambitious project to cover the world in blocks is over\\r\\nImage: Microsoft\\r\\nMicrosoft is closing down its Minecraft Earth mobile game in June, due to the ongoing pandemic. The ambitious game had ai… [+1966 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Kirsten Korosec","title":"Kyte raises $9 million to deliver rental cars to your doorstep","description":"More than two years ago, Ludwig Schoenack, Nikolaus Volk and Francesco Wiedemann looked at the bevy of scooter services, ride-hailing apps, public transit and car-sharing options available in most urban centers in the United States and saw a gap in the mobili…","url":"https://techcrunch.com/2021/01/05/kyte-raises-9-million-to-deliver-rental-cars-to-your-doorstep/","urlToImage":"https://techcrunch.com/wp-content/uploads/2021/01/Screen-Shot-2021-01-05-at-10.04.21-AM.jpg?w=599","publishedAt":"2021-01-05T17:30:18Z","content":"More than two years ago, Ludwig Schoenack, Nikolaus Volk and Francesco Wiedemann looked at the bevy of scooter services, ride-hailing apps, public transit and car-sharing options available in most ur… [+3269 chars]"},{"source":{"id":"independent","name":"Independent"},"author":"James Crump","title":"Iran issues Interpol arrest warrant for Trump over Soleimani killing as tension rise","description":"The Iranian government has filed a “red notice” with Interpol that requests the arrest of US president Donald Trump and 47 other American officials for the assassination of Islamic Revolutionary Guard Corps major general Qassem Soleimani on 3 January 2020.","url":"http://www.independent.co.uk/news/world/americas/us-politics/trump-iran-arrest-warrant-interpol-b1782723.html","urlToImage":"https://static.independent.co.uk/2021/01/04/11/newFile-4.jpg","publishedAt":"2021-01-05T17:26:15Z","content":"The Iranian government has filed a red notice with Interpol that requests the arrest of US president Donald Trump and 47 other American officials for the assassination of Islamic Revolutionary Guard … [+1385 chars]"},{"source":{"id":"msnbc","name":"MSNBC"},"author":"MSNBC","title":"Saudi Arabia lifts blockade of Qatar in breakthrough agreement easing Gulf crisis","description":"Saudi Arabia has ended its yearslong blockade of Qatar, easing a regional crisis and delivering a  diplomatic win in the waning days of the Trump presidency.","url":"https://www.nbcnews.com/news/world/saudi-arabia-lifts-blockade-qatar-breakthrough-agreement-eases-gulf-crisis-n1250102","urlToImage":"https://media1.s-nbcnews.com/j/newscms/2021_01/3439623/210105-gulf-summit-mc-13502_af9c5a14df998a7d07bdbbe6e9fcafb7.nbcnews-fp-1200-630.JPG","publishedAt":"2021-01-05T17:23:00Z","content":"LONDON In a major thawing of relations, leaders from Saudi Arabia and its regional allies reached a breakthrough agreement with Qatar on Tuesday, ending three and a half years of impasse and restorin… [+4368 chars]"},{"source":{"id":"independent","name":"Independent"},"author":"Bethany Dawson","title":"Norway becomes first country to sell more electric cars than petrol vehicles","description":"The Norwegian government plans to ban the sale of petrol and diesel cars by 2025","url":"http://www.independent.co.uk/news/world/europe/norway-electric-cars-b1782706.html","urlToImage":"https://static.independent.co.uk/2020/11/07/17/newFile-2.jpg","publishedAt":"2021-01-05T17:22:36Z","content":"Electric cars comprised 54% of all new vehicle sales in Norway for 2019.\\r\\nThis makes Norway the first country to have sold more electriccars than petrol, hybrid, and diesel engines in a year.\\r\\nThe No… [+1163 chars]"},{"source":{"id":"buzzfeed","name":"Buzzfeed"},"author":"[{\\"@type\\":\\"Person\\",\\"name\\":\\"Nora Dominick\\",\\"url\\":\\"https://www.buzzfeed.com/noradominick\\",\\"jobTitle\\":\\"BuzzFeed Staff\\"}]","title":"27 \\"Bridgerton\\" Behind-The-Scenes Facts That You Probably Didn\'t Know, But Should","description":"It took Nicola Coughlan two hours to get into Penelope\'s wig.","url":"https://www.buzzfeed.com/noradominick/bridgerton-behind-the-scenes-facts","urlToImage":"https://img.buzzfeed.com/buzzfeed-static/static/2021-01/5/16/enhanced/bad542e7c21c/original-10448-1609865507-22.jpg?crop=1200:628;0,0%26downsize=1250:*","publishedAt":"2021-01-05T17:22:22.5873715Z","content":"Netflix\\r\\nShowrunner Chris Van Dusen explained, \\"We had many many conversations about exactly what we were doing. It was all so that the cast would feel comfortable, and we all really left it in their… [+225 chars]"}]}'
      )
      let {
        status = '',
        totalResults = 0,
        articles = [],
      } = await this.api.fetch(
        page,
        this.selectedCountry,
        this.selectedCategory,
        this.searchText
      )
      //let { status = '', totalResults = 0, articles = [] } = apiResponse

      if (status === 'ok') {
        this.totalResults = totalResults

        if (page === 1) {
          this.newsListModel.clear()
        }

        return articles.map((item, index) => new News(index, item))
      }
    } catch (err) {
      console.error(err)
    }
  }

  _hasMoreNews() {
    const startIndex = (this.currentPage - 1) * this.pageSize + 1

    return this.totalResults === 0 || startIndex < this.totalResults
  }
}
