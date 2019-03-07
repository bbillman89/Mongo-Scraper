$(document).ready(function(){
    
    $(document).on('click', '#scrape', handleScrape);
    
    //scrape articles
    function handleScrape(){
        $.get('/scrape').then(function(data){
            displayAllArticles();
        })
    }
    
    //display all scraped articles
    function displayAllArticles(){
        $.get('/articles', function(articles){
            for (let ind of articles){
                $('.article-container')
                .append('<article data-id="' + ind._id + '">'
                + '<h1 class="article-title">'
                + ind.title
                + '<button id="save">Save'
                + '</button>'
                + '</h1>'
                + '<p class="article-summary">'
                + ind.description
                + '</p>' 
                + '<p class="article-link">'
                + ind.link
                + '</p>' 
                + '</article>');
            }
        })
    }
    
    //display only saved articles
    function displaySaved(){
        $.getJSON('/saved', function(articles){
            for (let ind of articles){
                $('.article-container')
                .append('<article data-id="' + ind._id + '">'
                + '<h1 class="article-title">'
                + ind.title
                + '<button id="remove">Remove'
                + '</button>'
                + '</h1>'
                + '<p class="article-summary">'
                + ind.description
                + '</p>' 
                + '<p class="article-link">'
                + ind.link
                + '</p>' 
                + '</article>');
            }
        })
    }
})
