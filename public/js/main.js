

//save an article - change data-saved="false" to "true"
$(document).on('click', '#save', function() {
    let thisId = $(this).attr('data-id');

    console.log(thisId);

    $.ajax({
        method: 'POST',
        url: '/saveTrue/' + thisId
    })
    .then(function(data) {
        //console.log(data);
    })
});

//add a note to an article

    
//delete a single note


//delete ALL articles
$(document).on('click', '#clear', () => {
    $.post('/delete', bye => {
        alert('db is cleared');
        location.reload();
    })
});

//delete article by id


