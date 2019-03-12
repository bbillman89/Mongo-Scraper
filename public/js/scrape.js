$(document).ready(function(){
    
    displayAllArticles();

    $(document).on('click', '#scrape', handleScrape);
    
    //scrape articles and display on homepage
    function handleScrape(){
        $.get('/scrape').then(function(data){
            displayAllArticles();
        })
    }
    
    //display all scraped articles
    function displayAllArticles(){
        $.get('/unArt', function(articles){
            for (let ind of articles){
                $('.article-container')
                .append('<article >'
                + '<h1 class="article-title">'
                + ind.title
                + '<button id="save"' + 'data-id="' + ind._id + '">Save</button>'
                + '</h1>'
                + '<p class="article-summary">'
                + ind.description
                + '<br>'
                + '<a href="https://www.nps.gov' + ind.link + '">' + 'https://www.nps.gov' + ind.link + '</a>'
                + '</p>' 
                + '</article>');
            }
        })
    }
    
})

/*$(document).on('click', '#save', () => {

})*/
