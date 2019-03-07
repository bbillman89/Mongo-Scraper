//alert('main.js is connected');

$.getJSON('/articles', function(articles){
    for (let ind of articles){
        $('.article-container')
        .append('<article data-id="' + ind._id + '">'
        + '<h1 class="article-title">'
        + ind.title
        + '</h1>'
        + '<p class="article-summary">'
        + ind.description
        + '</p>' 
        + '</article>');
    }
})