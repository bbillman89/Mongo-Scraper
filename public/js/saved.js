$(document).ready(function(){
    
    displaySaved();
    
    //display only saved articles
    function displaySaved(){
        $.get('/savedArt', function(articles){
            for (let ind of articles){
                $('.article-container')
                .append('<article data-id="' + ind._id + ' data-saved="' + ind.saved + '">'
                + '<h1 class="article-title">'
                + ind.title
                + '<button id="remove">Remove'
                + '</button>'
                + '</h1>'
                + '<div class="article-summary"'
                + '<p>' + ind.description + '</p>'
                + '<p>'
                + '<a href="https://www.nps.gov' + ind.link + '>' + 'https://www.nps.gov' + ind.link + '</a>'
                + '</p>'
                + '</div>'
                + '</article>');
            }
        })
    }

    
})
